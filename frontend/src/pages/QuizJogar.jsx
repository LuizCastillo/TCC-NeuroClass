import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, ApiError } from "../services/api";
import { useQuizContext } from "../hooks/useQuizContext";
import BarraProgresso from "../components/BarraProgresso";
import AlternativaBotao from "../components/AlternativaBotao";
import "./Quiz.css";

const LETRAS = ["A", "B", "C", "D"];

export default function QuizJogar() {
  const { usuario, tentativa } = useQuizContext();
  const navigate = useNavigate();

  const [indiceAtual, setIndiceAtual] = useState(0);
  const [alternativaSelecionadaId, setAlternativaSelecionadaId] = useState(null);
  const [resultadoResposta, setResultadoResposta] = useState(null); // { correta, alternativa_correta_id, feedback }
  const [respondendo, setRespondendo] = useState(false);
  const [finalizando, setFinalizando] = useState(false);
  const [erro, setErro] = useState("");

  // Se o usuário chegar direto nesta URL sem ter iniciado uma tentativa,
  // manda de volta para o cadastro (RN evita estado inconsistente na SPA).
  useEffect(() => {
    if (!usuario || !tentativa) {
      navigate("/quiz", { replace: true });
    }
  }, [usuario, tentativa, navigate]);

  if (!usuario || !tentativa) {
    return null;
  }

  const questao = tentativa.questoes[indiceAtual];
  const ehUltimaQuestao = indiceAtual === tentativa.questoes.length - 1;

  async function selecionarAlternativa(alternativaId) {
    if (resultadoResposta) return; // já respondida
    setErro("");
    setAlternativaSelecionadaId(alternativaId);
    setRespondendo(true);
    try {
      const resposta = await api.responderQuestao(tentativa.tentativa_id, questao.id, alternativaId);
      setResultadoResposta(resposta);
    } catch (e) {
      setAlternativaSelecionadaId(null);
      setErro(
        e instanceof ApiError
          ? e.message
          : "Não foi possível registrar sua resposta. Tente novamente."
      );
    } finally {
      setRespondendo(false);
    }
  }

  async function avancar() {
    if (!ehUltimaQuestao) {
      setIndiceAtual((i) => i + 1);
      setAlternativaSelecionadaId(null);
      setResultadoResposta(null);
      return;
    }

    setFinalizando(true);
    setErro("");
    try {
      await api.finalizarTentativa(tentativa.tentativa_id);
      navigate(`/quiz/resultado/${tentativa.tentativa_id}`);
    } catch (e) {
      setErro(
        e instanceof ApiError ? e.message : "Não foi possível finalizar o quiz. Tente novamente."
      );
    } finally {
      setFinalizando(false);
    }
  }

  return (
    <div className="container container--estreito pagina-quiz-jogar">
      <BarraProgresso atual={indiceAtual + 1} total={tentativa.questoes.length} />

      <div className="cartao questao-card">
        {questao.fonte && <span className="questao-card__fonte">Fonte: {questao.fonte}</span>}
        <h1 className="questao-card__enunciado">{questao.enunciado}</h1>

        <div className="questao-card__alternativas" role="group" aria-label="Alternativas">
          {questao.alternativas.map((alt, i) => (
            <AlternativaBotao
              key={alt.id}
              texto={alt.texto}
              letra={LETRAS[i]}
              onClick={() => selecionarAlternativa(alt.id)}
              respondida={!!resultadoResposta}
              ehSelecionada={alt.id === alternativaSelecionadaId}
              ehCorreta={resultadoResposta ? alt.id === resultadoResposta.alternativa_correta_id : false}
            />
          ))}
        </div>

        {respondendo && <p className="questao-card__carregando">Verificando resposta...</p>}

        {resultadoResposta && (
          <div
            className={
              "questao-card__feedback " +
              (resultadoResposta.correta
                ? "questao-card__feedback--correta"
                : "questao-card__feedback--incorreta")
            }
            role="status"
          >
            <strong>{resultadoResposta.correta ? "Certinho!" : "Não foi dessa vez."}</strong>
            <p>{resultadoResposta.feedback}</p>
          </div>
        )}

        {erro && (
          <p className="mensagem-erro" role="alert">
            {erro}
          </p>
        )}

        {resultadoResposta && (
          <button
            type="button"
            className="botao botao--primario botao--grande botao--largo"
            onClick={avancar}
            disabled={finalizando}
          >
            {finalizando
              ? "Calculando resultado..."
              : ehUltimaQuestao
              ? "Ver resultado"
              : "Próxima questão"}
          </button>
        )}
      </div>
    </div>
  );
}
