"""
Exportação de rotina para calendário externo (Google Calendar, Apple
Calendar, Outlook) via formato iCalendar (.ics) — RFC 5545.

Essa abordagem não depende de nenhuma API externa nem de OAuth: qualquer
aplicativo de calendário sabe importar um arquivo .ics ou "assinar" uma
URL que devolve esse formato, atualizando automaticamente. É um recurso
premium (ver AssinaturaService.exigir_premium).
"""
import uuid
from datetime import datetime, timedelta, timezone
from typing import Optional
from uuid import UUID

from fastapi import HTTPException, status

from app.db.repositories import TarefaRepository, UsuarioRepository
from app.services.assinatura_service import AssinaturaService

DURACAO_PADRAO_MINUTOS = 30


def _escapar_texto_ics(texto: str) -> str:
    return (
        texto.replace("\\", "\\\\")
        .replace(";", "\\;")
        .replace(",", "\\,")
        .replace("\n", "\\n")
    )


def _formatar_datahora(data_str: str, horario_str: Optional[str]) -> tuple[str, bool]:
    """Retorna (valor formatado para o .ics, se é evento de dia inteiro)."""
    if not horario_str:
        return data_str.replace("-", ""), True
    data_hora = f"{data_str}T{horario_str}"
    dt = datetime.fromisoformat(data_hora)
    return dt.strftime("%Y%m%dT%H%M%S"), False


class CalendarioService:
    def __init__(self):
        self.usuario_repo = UsuarioRepository()
        self.tarefa_repo = TarefaRepository()
        self.assinatura_service = AssinaturaService()

    def obter_ou_criar_token(self, usuario_id: UUID) -> UUID:
        self.assinatura_service.exigir_premium(usuario_id)
        usuario = self.usuario_repo.buscar_por_id(usuario_id)
        token_existente = usuario.get("token_calendario")
        if token_existente:
            return UUID(token_existente)

        novo_token = uuid.uuid4()
        self.usuario_repo.definir_token_calendario(usuario_id, novo_token)
        return novo_token

    def regenerar_token(self, usuario_id: UUID) -> UUID:
        self.assinatura_service.exigir_premium(usuario_id)
        novo_token = uuid.uuid4()
        self.usuario_repo.definir_token_calendario(usuario_id, novo_token)
        return novo_token

    def gerar_ics_por_token(self, token: UUID) -> str:
        usuario = self.usuario_repo.buscar_por_token_calendario(token)
        if not usuario:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Link de calendário inválido")
        if usuario.get("plano") != "premium":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Este link de calendário pertence a uma conta que não está mais no plano premium.",
            )
        tarefas = self.tarefa_repo.listar_por_usuario(usuario["id"])
        return self._montar_ics(tarefas, nome_calendario=f"NeuroClass — {usuario['nome']}")

    def gerar_ics_avulso(self, usuario_id: UUID) -> str:
        """Gera o .ics para download direto (sem precisar de link fixo)."""
        self.assinatura_service.exigir_premium(usuario_id)
        usuario = self.usuario_repo.buscar_por_id(usuario_id)
        tarefas = self.tarefa_repo.listar_por_usuario(usuario_id)
        return self._montar_ics(tarefas, nome_calendario=f"NeuroClass — {usuario['nome']}")

    def _montar_ics(self, tarefas: list[dict], nome_calendario: str) -> str:
        agora = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
        linhas = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "PRODID:-//NeuroClass//Rotina//PT-BR",
            "CALSCALE:GREGORIAN",
            f"X-WR-CALNAME:{_escapar_texto_ics(nome_calendario)}",
            "X-WR-TIMEZONE:America/Sao_Paulo",
        ]

        for tarefa in tarefas:
            inicio, dia_inteiro = _formatar_datahora(tarefa["data"], tarefa.get("horario"))
            linhas.append("BEGIN:VEVENT")
            linhas.append(f"UID:{tarefa['id']}@neuroclass")
            linhas.append(f"DTSTAMP:{agora}")

            if dia_inteiro:
                linhas.append(f"DTSTART;VALUE=DATE:{inicio}")
            else:
                duracao = tarefa.get("duracao_minutos") or DURACAO_PADRAO_MINUTOS
                dt_inicio = datetime.strptime(inicio, "%Y%m%dT%H%M%S")
                dt_fim = dt_inicio + timedelta(minutes=duracao)
                linhas.append(f"DTSTART:{inicio}")
                linhas.append(f"DTEND:{dt_fim.strftime('%Y%m%dT%H%M%S')}")

            linhas.append(f"SUMMARY:{_escapar_texto_ics(tarefa['titulo'])}")
            if tarefa.get("descricao"):
                linhas.append(f"DESCRIPTION:{_escapar_texto_ics(tarefa['descricao'])}")
            status_ics = "CONFIRMED" if not tarefa.get("concluida") else "CANCELLED"
            linhas.append(f"STATUS:{status_ics}")
            linhas.append("END:VEVENT")

        linhas.append("END:VCALENDAR")
        return "\r\n".join(linhas)
