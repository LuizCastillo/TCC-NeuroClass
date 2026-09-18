"""
Regras de negócio da ferramenta de organização e rotina. Este módulo é o
único lugar que valida que uma tarefa/subtarefa pertence ao usuário que
está tentando acessá-la — como não há login com sessão/token, essa
verificação por usuario_id é a camada de proteção real do sistema (as
rotas nunca confiam apenas no que o frontend envia).
"""
from datetime import date as Date
from typing import Optional
from uuid import UUID

from fastapi import HTTPException, status

from app.db.repositories import SubtarefaRepository, TarefaRepository, UsuarioRepository
from app.models.tarefa_models import (
    SubtarefaCreate,
    SubtarefaOut,
    SubtarefaUpdate,
    TarefaCreate,
    TarefaOut,
    TarefaUpdate,
)


class PlanejamentoService:
    def __init__(self):
        self.usuario_repo = UsuarioRepository()
        self.tarefa_repo = TarefaRepository()
        self.subtarefa_repo = SubtarefaRepository()

    # ------------------------------------------------------------------
    def _montar_tarefa_out(self, tarefa: dict, subtarefas: Optional[list[dict]] = None) -> TarefaOut:
        if subtarefas is None:
            subtarefas = self.subtarefa_repo.listar_por_tarefa(tarefa["id"])
        return TarefaOut(**tarefa, subtarefas=[SubtarefaOut(**s) for s in subtarefas])

    def _buscar_tarefa_ou_404(self, tarefa_id: UUID) -> dict:
        tarefa = self.tarefa_repo.buscar_por_id(tarefa_id)
        if not tarefa:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Tarefa não encontrada")
        return tarefa

    def _validar_dono(self, tarefa: dict, usuario_id: UUID) -> None:
        if str(tarefa["usuario_id"]) != str(usuario_id):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Tarefa não encontrada"
            )

    # ------------------------------------------------------------------
    def criar_tarefa(self, payload: TarefaCreate) -> TarefaOut:
        usuario = self.usuario_repo.buscar_por_id(payload.usuario_id)
        if not usuario:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuário não encontrado")

        dados = payload.model_dump(mode="json")
        criada = self.tarefa_repo.criar(dados)
        return self._montar_tarefa_out(criada, subtarefas=[])

    def listar_tarefas(self, usuario_id: UUID, data: Optional[Date] = None) -> list[TarefaOut]:
        tarefas = self.tarefa_repo.listar_por_usuario(usuario_id, data.isoformat() if data else None)
        resultado = []
        for tarefa in tarefas:
            subtarefas = self.subtarefa_repo.listar_por_tarefa(tarefa["id"])
            resultado.append(self._montar_tarefa_out(tarefa, subtarefas))
        return resultado

    def obter_tarefa(self, tarefa_id: UUID, usuario_id: UUID) -> TarefaOut:
        tarefa = self._buscar_tarefa_ou_404(tarefa_id)
        self._validar_dono(tarefa, usuario_id)
        return self._montar_tarefa_out(tarefa)

    def atualizar_tarefa(self, tarefa_id: UUID, usuario_id: UUID, payload: TarefaUpdate) -> TarefaOut:
        tarefa = self._buscar_tarefa_ou_404(tarefa_id)
        self._validar_dono(tarefa, usuario_id)

        dados = payload.model_dump(mode="json", exclude_unset=True)
        if not dados:
            return self._montar_tarefa_out(tarefa)

        atualizada = self.tarefa_repo.atualizar(tarefa_id, dados)
        return self._montar_tarefa_out(atualizada)

    def excluir_tarefa(self, tarefa_id: UUID, usuario_id: UUID) -> None:
        tarefa = self._buscar_tarefa_ou_404(tarefa_id)
        self._validar_dono(tarefa, usuario_id)
        self.tarefa_repo.excluir(tarefa_id)

    # ------------------------------------------------------------------
    def criar_subtarefa(self, tarefa_id: UUID, usuario_id: UUID, payload: SubtarefaCreate) -> SubtarefaOut:
        tarefa = self._buscar_tarefa_ou_404(tarefa_id)
        self._validar_dono(tarefa, usuario_id)

        existentes = self.subtarefa_repo.listar_por_tarefa(tarefa_id)
        proxima_ordem = len(existentes)
        criada = self.subtarefa_repo.criar(tarefa_id, payload.titulo, proxima_ordem)
        return SubtarefaOut(**criada)

    def atualizar_subtarefa(
        self, subtarefa_id: UUID, usuario_id: UUID, payload: SubtarefaUpdate
    ) -> SubtarefaOut:
        subtarefa = self.subtarefa_repo.buscar_por_id(subtarefa_id)
        if not subtarefa:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Subtarefa não encontrada")

        tarefa = self._buscar_tarefa_ou_404(subtarefa["tarefa_id"])
        self._validar_dono(tarefa, usuario_id)

        dados = payload.model_dump(exclude_unset=True)
        if not dados:
            return SubtarefaOut(**subtarefa)

        atualizada = self.subtarefa_repo.atualizar(subtarefa_id, dados)
        return SubtarefaOut(**atualizada)

    def excluir_subtarefa(self, subtarefa_id: UUID, usuario_id: UUID) -> None:
        subtarefa = self.subtarefa_repo.buscar_por_id(subtarefa_id)
        if not subtarefa:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Subtarefa não encontrada")

        tarefa = self._buscar_tarefa_ou_404(subtarefa["tarefa_id"])
        self._validar_dono(tarefa, usuario_id)
        self.subtarefa_repo.excluir(subtarefa_id)

    def reordenar_subtarefas(self, tarefa_id: UUID, usuario_id: UUID, ids_em_ordem: list[UUID]) -> list[SubtarefaOut]:
        tarefa = self._buscar_tarefa_ou_404(tarefa_id)
        self._validar_dono(tarefa, usuario_id)

        existentes = self.subtarefa_repo.listar_por_tarefa(tarefa_id)
        ids_existentes = {str(s["id"]) for s in existentes}
        ids_solicitados = {str(i) for i in ids_em_ordem}
        if ids_existentes != ids_solicitados:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="A lista de subtarefas enviada não corresponde às subtarefas existentes desta tarefa",
            )

        self.subtarefa_repo.reordenar(ids_em_ordem)
        return [SubtarefaOut(**s) for s in self.subtarefa_repo.listar_por_tarefa(tarefa_id)]
