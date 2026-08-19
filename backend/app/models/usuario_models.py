"""
Schemas Pydantic para validação de entrada/saída relacionadas a usuários
(Manual, Parte VI, capítulo 40 — toda entrada deve ser validada por schema
antes de qualquer processamento).
"""
from uuid import UUID

from pydantic import BaseModel, EmailStr, Field, field_validator


class UsuarioCreate(BaseModel):
    """Corpo de POST /usuarios. Coleta apenas nome e e-mail (RNF05, LGPD)."""

    nome: str = Field(..., min_length=1, max_length=120)
    email: EmailStr = Field(..., max_length=160)

    @field_validator("nome")
    @classmethod
    def nome_nao_vazio(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("nome não pode ser vazio")
        return v


class UsuarioOut(BaseModel):
    id: UUID
    nome: str
    email: str
