"""
Middleware central de tratamento de exceções (Manual, Parte VI, capítulo 41).
Garante que nenhum erro de banco de dados ou stack trace seja repassado
diretamente ao frontend, e que os códigos de status HTTP sigam o padrão:
400 (validação), 401/403 (autenticação/autorização), 404 (não encontrado),
422 (regra de negócio violada), 500 (erro interno, com log detalhado apenas
no servidor).
"""
import logging

from fastapi import HTTPException, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

logger = logging.getLogger("neuroclass.errors")


def register_error_handlers(app):
    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(request: Request, exc: RequestValidationError):
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={
                "erro": "validacao",
                "mensagem": "Alguns campos enviados são inválidos.",
                "detalhes": exc.errors(),
            },
        )

    @app.exception_handler(HTTPException)
    async def http_exception_handler(request: Request, exc: HTTPException):
        return JSONResponse(
            status_code=exc.status_code,
            content={"erro": "requisicao", "mensagem": exc.detail},
        )

    @app.exception_handler(Exception)
    async def unhandled_exception_handler(request: Request, exc: Exception):
        logger.exception("Erro não tratado em %s", request.url.path)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "erro": "interno",
                "mensagem": "Não foi possível processar sua solicitação no momento. Tente novamente.",
            },
        )
