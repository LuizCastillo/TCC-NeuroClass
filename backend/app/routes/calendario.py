"""
Rotas de exportação de rotina para calendário externo (.ics). Recurso
premium — ver app/services/calendario_service.py.
"""
from uuid import UUID

from fastapi import APIRouter, Query, Response

from app.models.usuario_models import LinkCalendarioOut
from app.services.calendario_service import CalendarioService

router = APIRouter(tags=["calendario"])
service = CalendarioService()


@router.get("/calendario/link", response_model=LinkCalendarioOut)
def obter_link_calendario(usuario_id: UUID = Query(...)):
    """
    Retorna a URL de assinatura de calendário (.ics) do usuário premium,
    gerando um token na primeira chamada. Essa URL pode ser colada no
    Google Calendar ('Outros calendários' → 'A partir da URL'), no Apple
    Calendar ('Arquivo' → 'Nova assinatura de calendário') ou no Outlook.
    """
    token = service.obter_ou_criar_token(usuario_id)
    return LinkCalendarioOut(url=f"/calendario/{token}.ics")


@router.post("/calendario/link/regenerar", response_model=LinkCalendarioOut)
def regenerar_link_calendario(usuario_id: UUID = Query(...)):
    """Invalida o link anterior e gera um novo (caso o usuário queira revogar acesso)."""
    token = service.regenerar_token(usuario_id)
    return LinkCalendarioOut(url=f"/calendario/{token}.ics")


@router.get("/calendario/download.ics")
def baixar_ics(usuario_id: UUID = Query(...)):
    """Baixa um arquivo .ics único com a rotina atual (sem link fixo)."""
    conteudo = service.gerar_ics_avulso(usuario_id)
    return Response(
        content=conteudo,
        media_type="text/calendar; charset=utf-8",
        headers={"Content-Disposition": "attachment; filename=neuroclass-rotina.ics"},
    )


@router.get("/calendario/{token}.ics")
def obter_calendario_por_token(token: UUID):
    """
    Endpoint público (protegido apenas pelo token na URL, que funciona
    como uma senha de link). É este endpoint que aplicativos de calendário
    consultam periodicamente ao 'assinar' a URL.
    """
    conteudo = service.gerar_ics_por_token(token)
    return Response(content=conteudo, media_type="text/calendar; charset=utf-8")
