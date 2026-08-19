"""
Regras de negócio do quiz (Manual, Parte VIII). Este módulo é o único lugar
do sistema que conhece a resposta correta antes da correção — nunca o
frontend (RNF01, capítulos 54 e 55).
"""
import random
from uuid import UUID

from fastapi import HTTPException, status

from app.db.repositories import QuestaoRepository, RespostaRepository, TentativaRepository, UsuarioRepository
from app.models.quiz_models import (
    AlternativaPublica,
    FinalizarResponse,
    IniciarTentativaResponse,
    QuestaoPublica,
    ResponderResponse,
    ResultadoResponse,
)

QUANTIDADE_QUESTOES_POR_TENTATIVA = 10
QUANTIDADE_ALTERNATIVAS_POR_QUESTAO = 4

MENSAGENS_RESULTADO = {
    "alto": "Você demonstrou domínio sólido do conteúdo apresentado no site. Continue explorando os materiais para aprofundar ainda mais seu conhecimento sobre TDAH.",
    "medio": "Você já domina boa parte do conteúdo apresentado no site. Vale revisar as seções de conteúdo educativo para reforçar alguns pontos.",
    "baixo": "Esse é um bom ponto de partida! Revisite o conteúdo educativo do site para aprofundar seu conhecimento sobre TDAH e tente novamente quando quiser.",
}


class QuizService:
    def __init__(self):
        self.usuario_repo = UsuarioRepository()
        self.questao_repo = QuestaoRepository()
        self.tentativa_repo = TentativaRepository()
        self.resposta_repo = RespostaRepository()

    # ------------------------------------------------------------------
    # RF04/RF05/RN01/RN02/RN03/RN04: iniciar uma tentativa
    # ------------------------------------------------------------------
    def iniciar_tentativa(self, usuario_id: UUID, dificuldade: str) -> IniciarTentativaResponse:
        usuario = self.usuario_repo.buscar_por_id(usuario_id)
        if not usuario:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuário não encontrado")

        questoes_ativas = self.questao_repo.listar_ativas_por_dificuldade(dificuldade)
        if len(questoes_ativas) < QUANTIDADE_QUESTOES_POR_TENTATIVA:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=(
                    f"Banco de questões insuficiente para a dificuldade '{dificuldade}' "
                    f"(mínimo de {QUANTIDADE_QUESTOES_POR_TENTATIVA} questões ativas necessário)."
                ),
            )
        for q in questoes_ativas:
            if len(q.get("alternativas", [])) != QUANTIDADE_ALTERNATIVAS_POR_QUESTAO:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Inconsistência no banco de questões: uma questão ativa não tem exatamente 4 alternativas.",
                )

        # RN01/RN07: sorteia 10 questões dentre as ativas da dificuldade
        questoes_sorteadas = random.sample(questoes_ativas, QUANTIDADE_QUESTOES_POR_TENTATIVA)

        # RN03: a ordem das alternativas é sorteada por questão
        gabarito = {"ordem_questoes": [], "questoes": {}}
        questoes_publicas: list[QuestaoPublica] = []

        for ordem, questao in enumerate(questoes_sorteadas):
            alternativas = list(questao["alternativas"])
            random.shuffle(alternativas)

            alternativa_correta = next(a for a in alternativas if a["correta"])

            gabarito["ordem_questoes"].append(questao["id"])
            gabarito["questoes"][questao["id"]] = {
                "alternativa_correta_id": alternativa_correta["id"],
                "feedbacks": {a["id"]: a["feedback"] or "" for a in alternativas},
            }

            alternativas_publicas = [
                AlternativaPublica(id=a["id"], texto=a["texto"], ordem=i)
                for i, a in enumerate(alternativas)
            ]
            questoes_publicas.append(
                QuestaoPublica(
                    id=questao["id"],
                    enunciado=questao["enunciado"],
                    ordem=ordem,
                    fonte=questao.get("fonte"),
                    alternativas=alternativas_publicas,
                )
            )

        tentativa = self.tentativa_repo.criar(usuario_id, dificuldade, gabarito)

        return IniciarTentativaResponse(
            tentativa_id=tentativa["id"],
            dificuldade=dificuldade,
            questoes=questoes_publicas,
        )

    # ------------------------------------------------------------------
    # RF07/RNF01/capítulo 55-56: responder uma questão e revelar feedback
    # ------------------------------------------------------------------
    def responder(self, tentativa_id: UUID, questao_id: UUID, alternativa_id: UUID) -> ResponderResponse:
        tentativa = self.tentativa_repo.buscar_por_id(tentativa_id)
        if not tentativa:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Tentativa não encontrada")
        if tentativa.get("concluida"):
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="Esta tentativa já foi concluída"
            )

        gabarito = tentativa.get("gabarito") or {}
        questoes_gabarito = gabarito.get("questoes", {})
        questao_key = str(questao_id)

        if questao_key not in questoes_gabarito:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Esta questão não pertence a esta tentativa",
            )

        info_questao = questoes_gabarito[questao_key]
        alternativa_correta_id = info_questao["alternativa_correta_id"]
        alternativa_key = str(alternativa_id)

        if alternativa_key not in info_questao.get("feedbacks", {}):
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Esta alternativa não pertence a esta questão",
            )

        acertou = alternativa_key == str(alternativa_correta_id)
        feedback = info_questao["feedbacks"].get(alternativa_key, "")

        respostas_ja_dadas = self.resposta_repo.contar_por_tentativa(tentativa_id)
        ordem = len(respostas_ja_dadas)

        self.resposta_repo.registrar(tentativa_id, questao_id, alternativa_id, acertou, ordem)

        return ResponderResponse(
            correta=acertou,
            alternativa_correta_id=alternativa_correta_id,
            feedback=feedback,
        )

    # ------------------------------------------------------------------
    # RF08/capítulo 57: finalizar tentativa e calcular pontuação
    # ------------------------------------------------------------------
    def finalizar(self, tentativa_id: UUID, disparar_email_callable) -> FinalizarResponse:
        tentativa = self.tentativa_repo.buscar_por_id(tentativa_id)
        if not tentativa:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Tentativa não encontrada")
        if tentativa.get("concluida"):
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="Esta tentativa já foi concluída"
            )

        respostas = self.resposta_repo.contar_por_tentativa(tentativa_id)
        acertos = sum(1 for r in respostas if r["correta"])
        erros = len(respostas) - acertos
        percentual = round((acertos / QUANTIDADE_QUESTOES_POR_TENTATIVA) * 100, 2)

        self.tentativa_repo.marcar_concluida(tentativa_id, acertos, erros, percentual)

        # RN06/RF09: envio assíncrono do e-mail, sem bloquear a resposta ao usuário
        usuario = self.usuario_repo.buscar_por_id(tentativa["usuario_id"])
        email_enviado = False
        if usuario:
            email_enviado = disparar_email_callable(
                usuario=usuario,
                dificuldade=tentativa["dificuldade"],
                acertos=acertos,
                erros=erros,
                percentual=percentual,
            )

        return FinalizarResponse(
            tentativa_id=tentativa_id,
            acertos=acertos,
            erros=erros,
            percentual=percentual,
            email_enviado=email_enviado,
        )

    # ------------------------------------------------------------------
    # capítulo 58: tela de resultado (nunca sugere diagnóstico — RN09)
    # ------------------------------------------------------------------
    def obter_resultado(self, tentativa_id: UUID) -> ResultadoResponse:
        tentativa = self.tentativa_repo.buscar_por_id(tentativa_id)
        if not tentativa:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Tentativa não encontrada")

        usuario = self.usuario_repo.buscar_por_id(tentativa["usuario_id"])
        percentual = float(tentativa.get("percentual") or 0)

        if percentual >= 80:
            faixa = "alto"
        elif percentual >= 50:
            faixa = "medio"
        else:
            faixa = "baixo"

        return ResultadoResponse(
            tentativa_id=tentativa_id,
            nome=usuario["nome"] if usuario else "",
            dificuldade=tentativa["dificuldade"],
            acertos=tentativa.get("acertos", 0),
            erros=tentativa.get("erros", 0),
            percentual=percentual,
            concluida=tentativa.get("concluida", False),
            mensagem=MENSAGENS_RESULTADO[faixa],
        )
