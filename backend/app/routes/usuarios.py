"""Rota POST /usuarios (Manual, Parte VI, capítulo 39)."""
from fastapi import APIRouter, HTTPException, status

from app.db.repositories import UsuarioRepository
from app.models.usuario_models import UsuarioCreate, UsuarioOut

router = APIRouter(tags=["usuarios"])
usuario_repo = UsuarioRepository()


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
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Não foi possível processar o cadastro do usuário no momento.",
        )
