"""
Schemas Pydantic para o fluxo do quiz (Manual, Parte VI, capítulo 39 e
Parte VIII). A resposta correta NUNCA aparece nos schemas de saída usados
antes da correção (RNF01 / capítulo 55).
"""
from typing import Literal, Optional
from uuid import UUID

from pydantic import BaseModel, Field

Dificuldade = Literal["facil", "medio", "dificil"]


class IniciarTentativaRequest(BaseModel):
    usuario_id: UUID
    dificuldade: Dificuldade


class AlternativaPublica(BaseModel):
    """Alternativa exposta ao frontend — nunca contém o campo 'correta'."""

    id: UUID
    texto: str
    ordem: int


class QuestaoPublica(BaseModel):
    id: UUID
    enunciado: str
    ordem: int
    fonte: Optional[str] = None
    alternativas: list[AlternativaPublica]


class IniciarTentativaResponse(BaseModel):
    tentativa_id: UUID
    dificuldade: Dificuldade
    questoes: list[QuestaoPublica]


class ResponderRequest(BaseModel):
    tentativa_id: UUID
    questao_id: UUID
    alternativa_id: UUID


class ResponderResponse(BaseModel):
    correta: bool
    alternativa_correta_id: UUID
    feedback: str


class FinalizarRequest(BaseModel):
    tentativa_id: UUID


class FinalizarResponse(BaseModel):
    tentativa_id: UUID
    acertos: int
    erros: int
    percentual: float
    email_enviado: bool


class ResultadoResponse(BaseModel):
    tentativa_id: UUID
    nome: str
    dificuldade: Dificuldade
    acertos: int
    erros: int
    percentual: float
    concluida: bool
    mensagem: str = Field(
        default="",
        description="Mensagem de encerramento educativa. Nunca sugere diagnóstico (RN09).",
    )
