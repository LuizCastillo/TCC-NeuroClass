"""Rotas do quiz (Manual, Parte VI, capítulo 39)."""
from uuid import UUID

from fastapi import APIRouter, HTTPException, Request, status

from app.middlewares.rate_limit import limiter
from app.models.quiz_models import (
    FinalizarRequest,
    FinalizarResponse,
    IniciarTentativaRequest,
    IniciarTentativaResponse,
    ResponderRequest,
    ResponderResponse,
    ResultadoResponse,
)
from app.services.email_service import EmailService
from app.services.quiz_service import QuizService

router = APIRouter(prefix="/quiz", tags=["quiz"])

quiz_service = QuizService()
email_service = EmailService()


@router.post("/iniciar", response_model=IniciarTentativaResponse, status_code=status.HTTP_201_CREATED)
@limiter.limit("20/minute")
def iniciar_tentativa(request: Request, payload: IniciarTentativaRequest):
    """
    Recebe usuario_id e dificuldade; retorna tentativa_id e a lista de 10
    questões (sem indicar a alternativa correta), já com alternativas
    embaralhadas (RF04, RF05, RN01-RN04).

    Rate limiting básico (20/min por IP) aplicado por ser o ponto de entrada
    de cada tentativa de quiz — endpoint mais sensível a automação abusiva
    (Manual, capítulo 72).
    """
    return quiz_service.iniciar_tentativa(payload.usuario_id, payload.dificuldade)


@router.post("/responder", response_model=ResponderResponse)
def responder_questao(payload: ResponderRequest):
    """
    Recebe tentativa_id, questao_id e alternativa_id; retorna se a resposta
    está correta, a alternativa correta e a explicação (RF07, capítulos 55-56).
    """
    return quiz_service.responder(payload.tentativa_id, payload.questao_id, payload.alternativa_id)


@router.post("/finalizar", response_model=FinalizarResponse)
def finalizar_tentativa(payload: FinalizarRequest):
    """
    Calcula pontuação final, marca a tentativa como concluída e aciona o
    envio do e-mail (RF08, RF09, RN06, capítulo 57).
    """

    def disparar_email(usuario: dict, dificuldade: str, acertos: int, erros: int, percentual: float) -> bool:
        return email_service.enviar_resultado(usuario, dificuldade, acertos, erros, percentual)

    return quiz_service.finalizar(payload.tentativa_id, disparar_email)


@router.get("/resultado/{tentativa_id}", response_model=ResultadoResponse)
def obter_resultado(tentativa_id: UUID):
    """Retorna o resumo do resultado, para exibição na tela final (capítulo 58)."""
    return quiz_service.obter_resultado(tentativa_id)
