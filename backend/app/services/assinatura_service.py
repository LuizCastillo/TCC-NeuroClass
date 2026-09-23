"""
Serviço de assinatura premium.

ATENÇÃO — SIMULAÇÃO: nesta fase do projeto (TCC), não há nenhum
processador de pagamento real integrado (Stripe, Mercado Pago, etc.).
"Ativar o premium" apenas marca o usuário como premium no banco de dados,
sem qualquer cobrança de fato. Isso é intencional e está documentado nos
Termos de Uso do site. Quando/se o projeto evoluir para cobrança real,
este é o único módulo que precisa mudar — as rotas e o frontend já estão
preparados para simplesmente trocar a simulação por um webhook de
pagamento de verdade.
"""
from uuid import UUID

from fastapi import HTTPException, status

from app.db.repositories import UsuarioRepository
from app.models.usuario_models import AssinaturaOut


class AssinaturaService:
    def __init__(self):
        self.usuario_repo = UsuarioRepository()

    def obter_status(self, usuario_id: UUID) -> AssinaturaOut:
        usuario = self.usuario_repo.buscar_por_id(usuario_id)
        if not usuario:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuário não encontrado")
        return AssinaturaOut(usuario_id=usuario_id, plano=usuario.get("plano", "gratuito"))

    def ativar_premium(self, usuario_id: UUID) -> AssinaturaOut:
        usuario = self.usuario_repo.buscar_por_id(usuario_id)
        if not usuario:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuário não encontrado")

        atualizado = self.usuario_repo.atualizar_plano(usuario_id, "premium")
        return AssinaturaOut(usuario_id=usuario_id, plano=atualizado["plano"])

    def cancelar_premium(self, usuario_id: UUID) -> AssinaturaOut:
        usuario = self.usuario_repo.buscar_por_id(usuario_id)
        if not usuario:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuário não encontrado")

        atualizado = self.usuario_repo.atualizar_plano(usuario_id, "gratuito")
        return AssinaturaOut(usuario_id=usuario_id, plano=atualizado["plano"])

    def exigir_premium(self, usuario_id: UUID) -> None:
        """Levanta 403 se o usuário não estiver no plano premium."""
        usuario = self.usuario_repo.buscar_por_id(usuario_id)
        if not usuario:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuário não encontrado")
        if usuario.get("plano") != "premium":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Este recurso é exclusivo do plano premium.",
            )
