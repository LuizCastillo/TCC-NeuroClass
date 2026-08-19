"""
Leitura centralizada de variáveis de ambiente (Manual, Parte IV, capítulo 28).
Nenhuma credencial deve existir no código-fonte: tudo vem de variáveis de
ambiente, definidas localmente em .env (não versionado) ou no painel do
Railway em produção.
"""
import os
from functools import lru_cache

from dotenv import load_dotenv

load_dotenv()


class Settings:
    supabase_url: str = os.getenv("SUPABASE_URL", "")
    supabase_key: str = os.getenv("SUPABASE_KEY", "")
    email_api_key: str = os.getenv("EMAIL_API_KEY", "")
    email_from: str = os.getenv("EMAIL_FROM", "NeuroClass <resultado@neuroclass.example.com>")
    cors_origin: str = os.getenv("CORS_ORIGIN", "http://localhost:5173")
    environment: str = os.getenv("ENVIRONMENT", "development")

    @property
    def is_configured_for_db(self) -> bool:
        return bool(self.supabase_url and self.supabase_key)

    @property
    def is_configured_for_email(self) -> bool:
        return bool(self.email_api_key)


@lru_cache
def get_settings() -> Settings:
    return Settings()
