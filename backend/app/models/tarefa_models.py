"""
Schemas Pydantic para a ferramenta de organização e rotina ("Ferramentas
para o dia a dia" — substitui a antiga área de vídeo institucional).

Como o projeto não possui sistema de login/senha, o usuário é identificado
da mesma forma que no quiz (nome + e-mail, ver app/models/usuario_models.py).
Todo acesso a tarefas exige um usuario_id, e o backend sempre valida que a
tarefa pertence a esse usuário antes de retornar ou modificar qualquer dado.
"""
from datetime import date as Date
from datetime import time as Time
from typing import Literal, Optional
from uuid import UUID

from pydantic import BaseModel, Field

Prioridade = Literal["baixa", "media", "alta"]
Categoria = Literal["estudos", "trabalhos", "escola", "leitura", "projetos", "outros"]


class SubtarefaCreate(BaseModel):
    titulo: str = Field(..., min_length=1, max_length=160)


class SubtarefaOut(BaseModel):
    id: UUID
    tarefa_id: UUID
    titulo: str
    concluida: bool
    ordem: int


class SubtarefaUpdate(BaseModel):
    titulo: Optional[str] = Field(None, min_length=1, max_length=160)
    concluida: Optional[bool] = None


class ReordenarSubtarefasRequest(BaseModel):
    ids_em_ordem: list[UUID] = Field(..., min_length=1)


class TarefaCreate(BaseModel):
    usuario_id: UUID
    titulo: str = Field(..., min_length=1, max_length=120)
    descricao: Optional[str] = None
    data: Date
    horario: Optional[Time] = None
    duracao_minutos: Optional[int] = Field(None, ge=1, le=1440)
    prioridade: Prioridade = "media"
    categoria: Categoria = "outros"


class TarefaUpdate(BaseModel):
    titulo: Optional[str] = Field(None, min_length=1, max_length=120)
    descricao: Optional[str] = None
    data: Optional[Date] = None
    horario: Optional[Time] = None
    duracao_minutos: Optional[int] = Field(None, ge=1, le=1440)
    prioridade: Optional[Prioridade] = None
    categoria: Optional[Categoria] = None
    concluida: Optional[bool] = None


class TarefaOut(BaseModel):
    id: UUID
    usuario_id: UUID
    titulo: str
    descricao: Optional[str] = None
    data: Date
    horario: Optional[Time] = None
    duracao_minutos: Optional[int] = None
    prioridade: Prioridade
    categoria: Categoria
    concluida: bool
    subtarefas: list[SubtarefaOut] = []
