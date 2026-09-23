"""Schemas Pydantic para validação de entrada/saída relacionadas a usuários
(Manual, Parte VI, capítulo 40 — toda entrada deve ser validada por schema
antes de qualquer processamento)."""
from typing import Literal
from uuid import UUID

from pydantic import BaseModel, EmailStr, Field, field_validator

Plano = Literal["gratuito", "premium"]
Tema = Literal["azul", "verde", "roxo", "laranja"]


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
    plano: Plano = "gratuito"
    tema: Tema = "azul"


class AtualizarTemaRequest(BaseModel):
    tema: Tema


class AssinaturaOut(BaseModel):
    """
    Estado da assinatura do usuário.

    ATENÇÃO: nesta fase do projeto, o plano premium é uma SIMULAÇÃO para
    fins de TCC. Não há processador de pagamento real integrado — nenhuma
    cobrança acontece de fato ao "ativar" o premium.
    """

    usuario_id: UUID
    plano: Plano
    simulado: bool = True



class LinkCalendarioOut(BaseModel):
    """
    Link de assinatura de calendário (.ics) para importar no Google
    Calendar, Apple Calendar ou Outlook via 'adicionar por URL'.
    """

    url: str
