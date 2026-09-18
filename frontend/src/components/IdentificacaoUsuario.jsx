import { useState } from "react";
import { useUsuarioPlanejamento } from "../hooks/useUsuarioPlanejamento";
import "./IdentificacaoUsuario.css";

/**
 * Formulário simples de nome + e-mail, mostrado na primeira vez que o
 * usuário acessa uma das ferramentas de organização/rotina neste
 * dispositivo. Depois de identificado, fica salvo (ver
 * useUsuarioPlanejamento) e essa tela não aparece mais.
 */
export default function IdentificacaoUsuario({ onIdentificado }) {
  const { identificar } = useUsuarioPlanejamento();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  async function aoSubmeter(evento) {
    evento.preventDefault();
    setErro("");
    if (!nome.trim() || !email.trim()) {
      setErro("Preencha seu nome e e-mail para continuar.");
      return;
    }
    setCarregando(true);
    try {
      const usuario = await identificar(nome.trim(), email.trim());
      onIdentificado(usuario);
    } catch {
      setErro("Não foi possível continuar agora. Verifique sua conexão e tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="container container--estreito identificacao-usuario">
      <h1>Antes de começar</h1>
      <p className="identificacao-usuario__intro">
        Informe seu nome e e-mail para usar as ferramentas de organização. Isso é só para
        identificar suas tarefas neste dispositivo — nenhuma senha é necessária.
      </p>

      <form className="cartao identificacao-usuario__form" onSubmit={aoSubmeter} noValidate>
        <div>
          <label className="rotulo" htmlFor="ident-nome">
            Nome
          </label>
          <input
            id="ident-nome"
            className="campo"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            autoComplete="name"
            required
          />
        </div>

        <div>
          <label className="rotulo" htmlFor="ident-email">
            E-mail
          </label>
          <input
            id="ident-email"
            className="campo"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>

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
          {carregando ? "Entrando..." : "Continuar"}
        </button>
      </form>
    </div>
  );
}
