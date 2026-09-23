"""Rota POST /usuarios (Manual, Parte VI, capítulo 39)."""
import logging
from uuid import UUID

from fastapi import APIRouter, HTTPException, Query, status

from app.db.repositories import UsuarioRepository
from app.models.usuario_models import AtualizarTemaRequest, UsuarioCreate, UsuarioOut

router = APIRouter(tags=["usuarios"])
usuario_repo = UsuarioRepository()
logger = logging.getLogger("neuroclass.usuarios")


@router.post("/usuarios", response_model=UsuarioOut, status_code=status.HTTP_201_CREATED)
def criar_ou_recuperar_usuario(payload: UsuarioCreate):
    """
    Cria um usuário a partir de nome e e-mail, ou recupera o usuário existente
    caso o e-mail já esteja cadastrado (evita duplicidade desnecessária,
    já que a coleta é mínima — nome e e-mail — conforme LGPD, capítulo 73).
    """
    try:
        existente = usuario_repo.buscar_por_email(payload.email)
        if existente:
            return UsuarioOut(**existente)

        criado = usuario_repo.criar(nome=payload.nome, email=payload.email)
        return UsuarioOut(**criado)
    except HTTPException:
        raise
    except Exception:
        logger.exception("Falha ao criar/recuperar usuário (email=%s)", payload.email)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Não foi possível processar o cadastro do usuário no momento.",
        )


@router.patch("/usuarios/tema", response_model=UsuarioOut)
def atualizar_tema(payload: AtualizarTemaRequest, usuario_id: UUID = Query(...)):
    """Atualiza a cor de destaque (tema) escolhida pelo usuário. Recurso premium."""
    from app.services.assinatura_service import AssinaturaService

    AssinaturaService().exigir_premium(usuario_id)

    atualizado = usuario_repo.atualizar_tema(usuario_id, payload.tema)
    if not atualizado:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuário não encontrado")
    return UsuarioOut(**atualizado)
