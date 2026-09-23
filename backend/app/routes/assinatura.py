"""
Rotas de assinatura premium.

ATENÇÃO — SIMULAÇÃO: não há processador de pagamento real integrado
nesta fase. Ver app/services/assinatura_service.py para detalhes.
"""
from uuid import UUID

from fastapi import APIRouter, Query, status

from app.models.usuario_models import AssinaturaOut
from app.services.assinatura_service import AssinaturaService

router = APIRouter(prefix="/assinatura", tags=["assinatura"])
service = AssinaturaService()


@router.get("", response_model=AssinaturaOut)
def obter_status_assinatura(usuario_id: UUID = Query(...)):
    """Retorna o plano atual do usuário (gratuito ou premium)."""
    return service.obter_status(usuario_id)


@router.post("/ativar", response_model=AssinaturaOut, status_code=status.HTTP_200_OK)
def ativar_premium(usuario_id: UUID = Query(...)):
    """
    Ativa o plano premium para o usuário.

    SIMULAÇÃO: nenhuma cobrança real é feita. Este endpoint existe para
    demonstrar o fluxo de upgrade do produto no contexto do TCC.
    """
    return service.ativar_premium(usuario_id)


@router.post("/cancelar", response_model=AssinaturaOut)
def cancelar_premium(usuario_id: UUID = Query(...)):
    """Cancela o plano premium, voltando o usuário para o plano gratuito."""
    return service.cancelar_premium(usuario_id)
