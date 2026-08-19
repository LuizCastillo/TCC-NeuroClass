"""
Configuração de CORS (Manual, Parte VI, capítulo 42). Em produção, aceita
apenas a origem do frontend (domínio da Vercel) — nunca "*".
"""
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings


def register_cors(app):
    settings = get_settings()
    origins = [settings.cors_origin]
    # Em desenvolvimento local, também libera o servidor padrão do Vite.
    if settings.environment == "development" and "http://localhost:5173" not in origins:
        origins.append("http://localhost:5173")

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["GET", "POST", "OPTIONS"],
        allow_headers=["*"],
    )
