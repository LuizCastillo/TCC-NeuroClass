"""
Camada de acesso a dados (Manual, Parte VI, capítulo 38). Isola todas as
consultas ao Supabase/PostgreSQL das rotas e das regras de negócio, para que
routes/ e services/ nunca montem SQL ou chamadas ao banco diretamente.
"""
from typing import Any, Optional
from uuid import UUID

from app.db.client import get_supabase_client


class UsuarioRepository:
    def buscar_por_email(self, email: str) -> Optional[dict[str, Any]]:
        client = get_supabase_client()
        resp = client.table("usuarios").select("*").eq("email", email).limit(1).execute()
        return resp.data[0] if resp.data else None

    def criar(self, nome: str, email: str) -> dict[str, Any]:
        client = get_supabase_client()
        resp = client.table("usuarios").insert({"nome": nome, "email": email}).execute()
        return resp.data[0]

    def buscar_por_id(self, usuario_id: UUID) -> Optional[dict[str, Any]]:
        client = get_supabase_client()
        resp = client.table("usuarios").select("*").eq("id", str(usuario_id)).limit(1).execute()
        return resp.data[0] if resp.data else None


class QuestaoRepository:
    def listar_ativas_por_dificuldade(self, dificuldade: str) -> list[dict[str, Any]]:
        client = get_supabase_client()
        resp = (
            client.table("questoes")
            .select("id, enunciado, dificuldade, fonte, alternativas(id, texto, correta, feedback)")
            .eq("dificuldade", dificuldade)
            .eq("ativa", True)
            .execute()
        )
        return resp.data

    def buscar_por_id(self, questao_id: UUID) -> Optional[dict[str, Any]]:
        client = get_supabase_client()
        resp = (
            client.table("questoes")
            .select("id, enunciado, dificuldade, fonte, alternativas(id, texto, correta, feedback)")
            .eq("id", str(questao_id))
            .limit(1)
            .execute()
        )
        return resp.data[0] if resp.data else None


class TentativaRepository:
    def criar(self, usuario_id: UUID, dificuldade: str, ordem_gabarito: dict) -> dict[str, Any]:
        """
        ordem_gabarito é persistido em uma coluna auxiliar 'gabarito' (jsonb) que
        guarda a ordem sorteada de questões/alternativas e a alternativa correta
        de cada questão para esta tentativa, sem nunca expor esse campo ao
        frontend (RNF01 / capítulo 55). Ver database/003_gabarito.sql.
        """
        client = get_supabase_client()
        resp = (
            client.table("tentativas")
            .insert(
                {
                    "usuario_id": str(usuario_id),
                    "dificuldade": dificuldade,
                    "gabarito": ordem_gabarito,
                }
            )
            .execute()
        )
        return resp.data[0]

    def buscar_por_id(self, tentativa_id: UUID) -> Optional[dict[str, Any]]:
        client = get_supabase_client()
        resp = client.table("tentativas").select("*").eq("id", str(tentativa_id)).limit(1).execute()
        return resp.data[0] if resp.data else None

    def marcar_concluida(self, tentativa_id: UUID, acertos: int, erros: int, percentual: float) -> dict[str, Any]:
        client = get_supabase_client()
        resp = (
            client.table("tentativas")
            .update({"acertos": acertos, "erros": erros, "percentual": percentual, "concluida": True})
            .eq("id", str(tentativa_id))
            .execute()
        )
        return resp.data[0]


class RespostaRepository:
    def registrar(
        self, tentativa_id: UUID, questao_id: UUID, alternativa_id: UUID, correta: bool, ordem: int
    ) -> dict[str, Any]:
        client = get_supabase_client()
        resp = (
            client.table("respostas")
            .insert(
                {
                    "tentativa_id": str(tentativa_id),
                    "questao_id": str(questao_id),
                    "alternativa_id": str(alternativa_id),
                    "correta": correta,
                    "ordem": ordem,
                }
            )
            .execute()
        )
        return resp.data[0]

    def contar_por_tentativa(self, tentativa_id: UUID) -> list[dict[str, Any]]:
        client = get_supabase_client()
        resp = client.table("respostas").select("*").eq("tentativa_id", str(tentativa_id)).execute()
        return resp.data
