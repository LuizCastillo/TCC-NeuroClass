"""
Rotas da ferramenta de organização e rotina ("Ferramentas para o dia a dia").
Todas as rotas de leitura/escrita exigem usuario_id e validam posse da
tarefa antes de qualquer operação (ver PlanejamentoService).
"""
from datetime import date as Date
from typing import Optional
from uuid import UUID

from fastapi import APIRouter, Query, status

from app.models.tarefa_models import (
    ReordenarSubtarefasRequest,
    SubtarefaCreate,
    SubtarefaOut,
    SubtarefaUpdate,
    TarefaCreate,
    TarefaOut,
    TarefaUpdate,
)
from app.services.planejamento_service import PlanejamentoService

router = APIRouter(tags=["planejamento"])
service = PlanejamentoService()


@router.post("/tarefas", response_model=TarefaOut, status_code=status.HTTP_201_CREATED)
def criar_tarefa(payload: TarefaCreate):
    """Cria uma nova tarefa para o usuário informado."""
    return service.criar_tarefa(payload)


@router.get("/tarefas", response_model=list[TarefaOut])
def listar_tarefas(
    usuario_id: UUID = Query(...),
    data: Optional[Date] = Query(None, description="Filtra tarefas de um dia específico (YYYY-MM-DD)"),
):
    """Lista as tarefas do usuário, opcionalmente filtradas por data."""
    return service.listar_tarefas(usuario_id, data)


@router.get("/tarefas/mes", response_model=list[TarefaOut])
def listar_tarefas_do_mes(
    usuario_id: UUID = Query(...),
    ano: int = Query(..., ge=2020, le=2100),
    mes: int = Query(..., ge=1, le=12),
):
    """
    Lista todas as tarefas de um mês inteiro, usada pela exportação de
    rotina como imagem (grade de calendário mensal).
    """
    return service.listar_tarefas_do_mes(usuario_id, ano, mes)


@router.get("/tarefas/{tarefa_id}", response_model=TarefaOut)
def obter_tarefa(tarefa_id: UUID, usuario_id: UUID = Query(...)):
    """Retorna uma tarefa e suas subtarefas."""
    return service.obter_tarefa(tarefa_id, usuario_id)


@router.patch("/tarefas/{tarefa_id}", response_model=TarefaOut)
def atualizar_tarefa(tarefa_id: UUID, payload: TarefaUpdate, usuario_id: UUID = Query(...)):
    """
    Atualiza campos de uma tarefa (título, horário, prioridade, etc.) ou
    marca/desmarca como concluída via o campo 'concluida'.
    """
    return service.atualizar_tarefa(tarefa_id, usuario_id, payload)


@router.delete("/tarefas/{tarefa_id}", status_code=status.HTTP_204_NO_CONTENT)
def excluir_tarefa(tarefa_id: UUID, usuario_id: UUID = Query(...)):
    """Exclui uma tarefa e suas subtarefas (cascade)."""
    service.excluir_tarefa(tarefa_id, usuario_id)


@router.post(
    "/tarefas/{tarefa_id}/subtarefas", response_model=SubtarefaOut, status_code=status.HTTP_201_CREATED
)
def criar_subtarefa(tarefa_id: UUID, payload: SubtarefaCreate, usuario_id: UUID = Query(...)):
    """Adiciona uma subtarefa (etapa) a uma tarefa existente."""
    return service.criar_subtarefa(tarefa_id, usuario_id, payload)


@router.patch("/tarefas/{tarefa_id}/subtarefas/reordenar", response_model=list[SubtarefaOut])
def reordenar_subtarefas(tarefa_id: UUID, payload: ReordenarSubtarefasRequest, usuario_id: UUID = Query(...)):
    """Reordena as subtarefas de uma tarefa, recebendo a lista completa de ids na nova ordem."""
    return service.reordenar_subtarefas(tarefa_id, usuario_id, payload.ids_em_ordem)


@router.patch("/subtarefas/{subtarefa_id}", response_model=SubtarefaOut)
def atualizar_subtarefa(subtarefa_id: UUID, payload: SubtarefaUpdate, usuario_id: UUID = Query(...)):
    """Atualiza o título ou o status de conclusão de uma subtarefa."""
    return service.atualizar_subtarefa(subtarefa_id, usuario_id, payload)


@router.delete("/subtarefas/{subtarefa_id}", status_code=status.HTTP_204_NO_CONTENT)
def excluir_subtarefa(subtarefa_id: UUID, usuario_id: UUID = Query(...)):
    """Exclui uma subtarefa."""
    service.excluir_subtarefa(subtarefa_id, usuario_id)
