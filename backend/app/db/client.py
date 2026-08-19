"""
Cliente do Supabase, usado exclusivamente pelo backend (Manual, Parte V,
capítulo 34 e Parte IV, capítulo 28). O frontend nunca deve receber ou usar
esta chave — ela é lida apenas de variável de ambiente no servidor.
"""
from functools import lru_cache

from supabase import Client, create_client

from app.config import get_settings


class SupabaseNotConfiguredError(RuntimeError):
    """Levantado quando SUPABASE_URL/SUPABASE_KEY não estão definidos."""


@lru_cache
def get_supabase_client() -> Client:
    settings = get_settings()
    if not settings.is_configured_for_db:
        raise SupabaseNotConfiguredError(
            "SUPABASE_URL e SUPABASE_KEY precisam estar definidos como variáveis de "
            "ambiente do backend. Nunca defina essas variáveis no frontend."
        )
    return create_client(settings.supabase_url, settings.supabase_key)
