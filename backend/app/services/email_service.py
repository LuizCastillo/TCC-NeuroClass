"""
Serviço de envio de e-mail (Manual, Parte VI capítulo 39, RF09, RN06).
Usa a API do Resend. O disparo é feito a partir do backend, de forma
assíncrona em relação à navegação do usuário (uma falha no envio não deve
travar o fluxo do quiz — capítulo 71).
"""
import logging

import resend

from app.config import get_settings

logger = logging.getLogger("neuroclass.email")

DIFICULDADE_LABEL = {"facil": "Fácil", "medio": "Médio", "dificil": "Difícil"}


class EmailService:
    def __init__(self):
        settings = get_settings()
        self._configurado = settings.is_configured_for_email
        if self._configurado:
            resend.api_key = settings.email_api_key
        self._email_from = settings.email_from

    def enviar_resultado(
        self, usuario: dict, dificuldade: str, acertos: int, erros: int, percentual: float
    ) -> bool:
        if not self._configurado:
            logger.warning(
                "EMAIL_API_KEY não configurada — e-mail de resultado não enviado para %s (modo desenvolvimento).",
                usuario.get("email"),
            )
            return False

        nome = usuario.get("nome", "")
        email = usuario.get("email")
        dificuldade_label = DIFICULDADE_LABEL.get(dificuldade, dificuldade)

        html = f"""
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
          <h2 style="color: #1d4ed8;">Resultado do seu quiz — NeuroClass</h2>
          <p>Olá, {nome}!</p>
          <p>Aqui está o resumo da sua tentativa no quiz educativo sobre TDAH:</p>
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
            <tr><td style="padding: 6px 0;"><strong>Dificuldade:</strong></td><td>{dificuldade_label}</td></tr>
            <tr><td style="padding: 6px 0;"><strong>Acertos:</strong></td><td>{acertos} de 10</td></tr>
            <tr><td style="padding: 6px 0;"><strong>Erros:</strong></td><td>{erros} de 10</td></tr>
            <tr><td style="padding: 6px 0;"><strong>Aproveitamento:</strong></td><td>{percentual}%</td></tr>
          </table>
          <p style="font-size: 14px; color: #475569;">
            Este quiz tem finalidade educativa e não constitui, em nenhuma hipótese,
            diagnóstico de TDAH. Para avaliação profissional, procure um psiquiatra,
            neurologista ou psicólogo qualificado.
          </p>
          <p style="font-size: 12px; color: #94a3b8;">NeuroClass — projeto de TCC educativo sobre TDAH.</p>
        </div>
        """

        try:
            resend.Emails.send(
                {
                    "from": self._email_from,
                    "to": [email],
                    "subject": "Seu resultado no quiz NeuroClass",
                    "html": html,
                }
            )
            return True
        except Exception:  # nunca deve travar o fluxo do usuário (capítulo 71)
            logger.exception("Falha ao enviar e-mail de resultado para %s", email)
            return False
