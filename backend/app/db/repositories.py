"""
Camada de acesso a dados (Manual, Parte VI, capítulo 38). Isola todas as
consultas ao Supabase/PostgreSQL das rotas e das regras de negócio, para que
routes/ e services/ nunca montem SQL ou chamadas ao banco diretamente.
"""
from typing import Any, Optional
from uuid import UUID
from datetime import datetime, timezone

from app.db.client import get_supabase_client


class UsuarioRepository:
    def buscar_por_email(self, email: str) -> Optional[dict[str, Any]]:
        client = get_supabase_client()
        resp = client.table("usuarios").select("*").eq("email", email).limit(1).execute()
        return resp.data[0] if resp.data else None

    def criar(self, nome: str, email: str) -> dict[str, Any]:
        client = get_supabase_client()
        resp = client.table("usuarios").insert({"nome": nome, "email": email}).execute()
        return resp.data[0]

    def buscar_por_id(self, usuario_id: UUID) -> Optional[dict[str, Any]]:
        client = get_supabase_client()
        resp = client.table("usuarios").select("*").eq("id", str(usuario_id)).limit(1).execute()
        return resp.data[0] if resp.data else None

    def atualizar_plano(self, usuario_id: UUID, plano: str) -> dict[str, Any]:
        client = get_supabase_client()
        agora = datetime.now(timezone.utc).isoformat()
        resp = (
            client.table("usuarios")
            .update({"plano": plano, "plano_atualizado_em": agora})
            .eq("id", str(usuario_id))
            .execute()
        )
        return resp.data[0]

    def atualizar_tema(self, usuario_id: UUID, tema: str) -> dict[str, Any]:
        client = get_supabase_client()
        resp = client.table("usuarios").update({"tema": tema}).eq("id", str(usuario_id)).execute()
        return resp.data[0]

    def definir_token_calendario(self, usuario_id: UUID, token: UUID) -> dict[str, Any]:
        client = get_supabase_client()
        resp = (
            client.table("usuarios")
            .update({"token_calendario": str(token)})
            .eq("id", str(usuario_id))
            .execute()
        )
        return resp.data[0]

    def buscar_por_token_calendario(self, token: UUID) -> Optional[dict[str, Any]]:
        client = get_supabase_client()
        resp = (
            client.table("usuarios")
            .select("*")
            .eq("token_calendario", str(token))
            .limit(1)
            .execute()
        )
        return resp.data[0] if resp.data else None


class QuestaoRepository:
    def listar_ativas_por_dificuldade(self, dificuldade: str) -> list[dict[str, Any]]:
        client = get_supabase_client()
        resp = (
            client.table("questoes")
            .select("id, enunciado, dificuldade, fonte, alternativas(id, texto, correta, feedback)")
            .eq("dificuldade", dificuldade)
            .eq("ativa", True)
            .execute()
        )
        return resp.data

    def buscar_por_id(self, questao_id: UUID) -> Optional[dict[str, Any]]:
        client = get_supabase_client()
        resp = (
            client.table("questoes")
            .select("id, enunciado, dificuldade, fonte, alternativas(id, texto, correta, feedback)")
            .eq("id", str(questao_id))
            .limit(1)
            .execute()
        )
        return resp.data[0] if resp.data else None


class TentativaRepository:
    def criar(self, usuario_id: UUID, dificuldade: str, ordem_gabarito: dict) -> dict[str, Any]:
        """
        ordem_gabarito é persistido em uma coluna auxiliar 'gabarito' (jsonb) que
        guarda a ordem sorteada de questões/alternativas e a alternativa correta
        de cada questão para esta tentativa, sem nunca expor esse campo ao
        frontend (RNF01 / capítulo 55). Ver database/003_gabarito.sql.
        """
        client = get_supabase_client()
        resp = (
            client.table("tentativas")
            .insert(
                {
                    "usuario_id": str(usuario_id),
                    "dificuldade": dificuldade,
                    "gabarito": ordem_gabarito,
                }
            )
            .execute()
        )
        return resp.data[0]

    def buscar_por_id(self, tentativa_id: UUID) -> Optional[dict[str, Any]]:
        client = get_supabase_client()
        resp = client.table("tentativas").select("*").eq("id", str(tentativa_id)).limit(1).execute()
        return resp.data[0] if resp.data else None

    def marcar_concluida(self, tentativa_id: UUID, acertos: int, erros: int, percentual: float) -> dict[str, Any]:
        client = get_supabase_client()
        resp = (
            client.table("tentativas")
            .update({"acertos": acertos, "erros": erros, "percentual": percentual, "concluida": True})
            .eq("id", str(tentativa_id))
            .execute()
        )
        return resp.data[0]


class RespostaRepository:
    def registrar(
        self, tentativa_id: UUID, questao_id: UUID, alternativa_id: UUID, correta: bool, ordem: int
    ) -> dict[str, Any]:
        client = get_supabase_client()
        resp = (
            client.table("respostas")
            .insert(
                {
                    "tentativa_id": str(tentativa_id),
                    "questao_id": str(questao_id),
                    "alternativa_id": str(alternativa_id),
                    "correta": correta,
                    "ordem": ordem,
                }
            )
            .execute()
        )
        return resp.data[0]

    def contar_por_tentativa(self, tentativa_id: UUID) -> list[dict[str, Any]]:
        client = get_supabase_client()
        resp = client.table("respostas").select("*").eq("tentativa_id", str(tentativa_id)).execute()
        return resp.data


class TarefaRepository:
    def criar(self, dados: dict[str, Any]) -> dict[str, Any]:
        client = get_supabase_client()
        resp = client.table("tarefas").insert(dados).execute()
        return resp.data[0]

    def listar_por_usuario(self, usuario_id: UUID, data: Optional[str] = None) -> list[dict[str, Any]]:
        client = get_supabase_client()
        query = client.table("tarefas").select("*").eq("usuario_id", str(usuario_id))
        if data:
            query = query.eq("data", data)
        resp = query.order("horario", desc=False, nullsfirst=False).execute()
        return resp.data

    def buscar_por_id(self, tarefa_id: UUID) -> Optional[dict[str, Any]]:
        client = get_supabase_client()
        resp = client.table("tarefas").select("*").eq("id", str(tarefa_id)).limit(1).execute()
        return resp.data[0] if resp.data else None

    def atualizar(self, tarefa_id: UUID, dados: dict[str, Any]) -> dict[str, Any]:
        client = get_supabase_client()
        resp = client.table("tarefas").update(dados).eq("id", str(tarefa_id)).execute()
        return resp.data[0]

    def excluir(self, tarefa_id: UUID) -> None:
        client = get_supabase_client()
        client.table("tarefas").delete().eq("id", str(tarefa_id)).execute()


class SubtarefaRepository:
    def criar(self, tarefa_id: UUID, titulo: str, ordem: int) -> dict[str, Any]:
        client = get_supabase_client()
        resp = (
            client.table("subtarefas")
            .insert({"tarefa_id": str(tarefa_id), "titulo": titulo, "ordem": ordem})
            .execute()
        )
        return resp.data[0]

    def listar_por_tarefa(self, tarefa_id: UUID) -> list[dict[str, Any]]:
        client = get_supabase_client()
        resp = (
            client.table("subtarefas")
            .select("*")
            .eq("tarefa_id", str(tarefa_id))
            .order("ordem", desc=False)
            .execute()
        )
        return resp.data

    def buscar_por_id(self, subtarefa_id: UUID) -> Optional[dict[str, Any]]:
        client = get_supabase_client()
        resp = client.table("subtarefas").select("*").eq("id", str(subtarefa_id)).limit(1).execute()
        return resp.data[0] if resp.data else None

    def atualizar(self, subtarefa_id: UUID, dados: dict[str, Any]) -> dict[str, Any]:
        client = get_supabase_client()
        resp = client.table("subtarefas").update(dados).eq("id", str(subtarefa_id)).execute()
        return resp.data[0]

    def excluir(self, subtarefa_id: UUID) -> None:
        client = get_supabase_client()
        client.table("subtarefas").delete().eq("id", str(subtarefa_id)).execute()

    def reordenar(self, ids_em_ordem: list[UUID]) -> None:
        client = get_supabase_client()
        for ordem, subtarefa_id in enumerate(ids_em_ordem):
            client.table("subtarefas").update({"ordem": ordem}).eq("id", str(subtarefa_id)).execute()
