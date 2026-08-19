import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, ApiError } from "../services/api";
import { useQuizContext } from "../hooks/useQuizContext";
import "./Quiz.css";

const DIFICULDADES = [
  { valor: "facil", rotulo: "Fácil", descricao: "Conceitos básicos sobre TDAH" },
  { valor: "medio", rotulo: "Médio", descricao: "Interpretação de situações do dia a dia" },
  { valor: "dificil", rotulo: "Difícil", descricao: "Aplicação em cenários mais elaborados" },
];

export default function QuizCadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [dificuldade, setDificuldade] = useState("facil");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const { setUsuario, setTentativa } = useQuizContext();

  async function aoSubmeter(evento) {
    evento.preventDefault();
    setErro("");

    if (!nome.trim() || !email.trim()) {
      setErro("Preencha seu nome e e-mail para continuar.");
      return;
    }

    setCarregando(true);
    try {
      const usuarioCriado = await api.criarUsuario(nome.trim(), email.trim());
      setUsuario(usuarioCriado);

      const tentativaCriada = await api.iniciarTentativa(usuarioCriado.id, dificuldade);
      setTentativa(tentativaCriada);

      navigate("/quiz/jogar");
    } catch (e) {
      const mensagem =
        e instanceof ApiError
          ? e.message
          : "Não foi possível iniciar o quiz agora. Verifique sua conexão e tente novamente.";
      setErro(mensagem);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="container container--estreito pagina-quiz-cadastro">
      <h1>Antes de começar</h1>
      <p className="pagina-quiz-cadastro__intro">
        Informe seu nome e e-mail para receber seu resultado, e escolha o nível de dificuldade do
        quiz.
      </p>

      <form className="cartao formulario-cadastro" onSubmit={aoSubmeter} noValidate>
        <div className="campo-grupo">
          <label className="rotulo" htmlFor="nome">
            Nome
          </label>
          <input
            id="nome"
            className="campo"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            autoComplete="name"
            required
          />
        </div>

        <div className="campo-grupo">
          <label className="rotulo" htmlFor="email">
            E-mail
          </label>
          <input
            id="email"
            className="campo"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>

        <fieldset className="campo-grupo campo-grupo--dificuldade">
          <legend className="rotulo">Dificuldade</legend>
          <div className="opcoes-dificuldade">
            {DIFICULDADES.map((opcao) => (
              <label
                key={opcao.valor}
                className={
                  "opcao-dificuldade" +
                  (dificuldade === opcao.valor ? " opcao-dificuldade--selecionada" : "")
                }
              >
                <input
                  type="radio"
                  name="dificuldade"
                  value={opcao.valor}
                  checked={dificuldade === opcao.valor}
                  onChange={() => setDificuldade(opcao.valor)}
                />
                <span className="opcao-dificuldade__rotulo">{opcao.rotulo}</span>
                <span className="opcao-dificuldade__descricao">{opcao.descricao}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {erro && (
          <p className="mensagem-erro" role="alert">
            {erro}
          </p>
        )}

        <button
          type="submit"
          className="botao botao--primario botao--grande botao--largo"
          disabled={carregando}
        >
          {carregando ? "Preparando o quiz..." : "Começar o quiz"}
        </button>
      </form>

      <p className="pagina-quiz-cadastro__lgpd">
        Seus dados são usados apenas para identificar seu resultado e enviá-lo por e-mail, em
        conformidade com a LGPD.
      </p>
    </div>
  );
}
