"""
Ponto de entrada da API NeuroClass (Manual, Parte VI, capítulo 38).
Rodar localmente: uvicorn app.main:app --reload
"""
import logging

from fastapi import FastAPI, status
from fastapi.responses import JSONResponse
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from app.middlewares.cors import register_cors
from app.middlewares.error_handler import register_error_handlers
from app.middlewares.rate_limit import limiter
from app.routes import planejamento, quiz, usuarios

logging.basicConfig(level=logging.INFO)

app = FastAPI(
    title="NeuroClass API",
    description=(
        "API do NeuroClass — plataforma educativa sobre TDAH. "
        "Este quiz tem finalidade educativa e não realiza diagnóstico (RN09)."
    ),
    version="1.0.0",
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

register_cors(app)
register_error_handlers(app)

app.include_router(usuarios.router)
app.include_router(quiz.router)
app.include_router(planejamento.router)


@app.get("/", tags=["status"])
def raiz():
    return {"status": "ok", "servico": "NeuroClass API"}


@app.get("/saude", tags=["status"])
def verificar_saude():
    """Endpoint simples de health check para monitoramento em produção (Render)."""
    return JSONResponse(status_code=status.HTTP_200_OK, content={"status": "saudavel"})
