import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api, ApiError } from "../services/api";
import "./Quiz.css";

const DIFICULDADE_LABEL = { facil: "Fácil", medio: "Médio", dificil: "Difícil" };

export default function QuizResultado() {
  const { tentativaId } = useParams();
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let ativo = true;
    setCarregando(true);
    api
      .obterResultado(tentativaId)
      .then((dados) => {
        if (ativo) setResultado(dados);
      })
      .catch((e) => {
        if (ativo) {
          setErro(
            e instanceof ApiError
              ? e.message
              : "Não foi possível carregar seu resultado no momento."
          );
        }
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });
    return () => {
      ativo = false;
    };
  }, [tentativaId]);

  if (carregando) {
    return (
      <div className="container container--estreito pagina-quiz-resultado">
        <p>Carregando seu resultado...</p>
      </div>
    );
  }

  if (erro || !resultado) {
    return (
      <div className="container container--estreito pagina-quiz-resultado">
        <p className="mensagem-erro" role="alert">
          {erro || "Resultado não encontrado."}
        </p>
        <Link to="/quiz" className="botao botao--primario">
          Voltar ao quiz
        </Link>
      </div>
    );
  }

  return (
    <div className="container container--estreito pagina-quiz-resultado">
      <div className="cartao resultado-card">
        <span className="rotulo-tag">{DIFICULDADE_LABEL[resultado.dificuldade]}</span>
        <h1>
          {resultado.nome ? `Boa, ${resultado.nome}!` : "Resultado do seu quiz"}
        </h1>

        <div className="resultado-card__percentual">{resultado.percentual}%</div>

        <div className="resultado-card__resumo">
          <div className="resultado-card__item resultado-card__item--acertos">
            <span className="resultado-card__numero">{resultado.acertos}</span>
            <span>acertos</span>
          </div>
          <div className="resultado-card__item resultado-card__item--erros">
            <span className="resultado-card__numero">{resultado.erros}</span>
            <span>erros</span>
          </div>
        </div>

        <p className="resultado-card__mensagem">{resultado.mensagem}</p>

        <p className="resultado-card__aviso">
          Enviamos esse resultado para o seu e-mail. Lembre-se: este quiz tem finalidade
          educativa e não constitui diagnóstico de TDAH.
        </p>

        <div className="resultado-card__acoes">
          <Link to="/quiz" className="botao botao--primario botao--grande">
            Fazer novamente
          </Link>
          <Link to="/conteudo" className="botao botao--secundario botao--grande">
            Ver conteúdo educativo
          </Link>
        </div>
      </div>
    </div>
  );
}
