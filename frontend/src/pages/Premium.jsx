import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, ApiError } from "../services/api";
import { useUsuarioPlanejamento } from "../hooks/useUsuarioPlanejamento";
import IdentificacaoUsuario from "../components/IdentificacaoUsuario";
import "./Premium.css";
import Icone from "../components/Icone";

const BENEFICIOS = [
  { icone: "calendario", texto: "Exportar sua rotina para Google Calendar, Apple Calendar ou Outlook" },
  { icone: "cor", texto: "Personalizar a cor de destaque do site" },
  { icone: "sino", texto: "Lembretes por e-mail antes de cada tarefa (em breve)" },
  { icone: "grafico", texto: "Relatório semanal de produtividade por e-mail (em breve)" },
];

export default function Premium() {
  const { usuario, carregandoInicial, atualizarUsuario } = useUsuarioPlanejamento();
  const navigate = useNavigate();
  const [processando, setProcessando] = useState(false);
  const [erro, setErro] = useState("");

  if (carregandoInicial) return null;
  if (!usuario) return <IdentificacaoUsuario onIdentificado={() => {}} />;

  const ehPremium = usuario.plano === "premium";

  async function ativar() {
    setProcessando(true);
    setErro("");
    try {
      await api.ativarPremium(usuario.id);
      atualizarUsuario({ ...usuario, plano: "premium" });
      navigate("/planejamento/calendario");
    } catch (e) {
      setErro(e instanceof ApiError ? e.message : "Não foi possível ativar agora. Tente novamente.");
    } finally {
      setProcessando(false);
    }
  }

  async function cancelar() {
    setProcessando(true);
    setErro("");
    try {
      await api.cancelarPremium(usuario.id);
      atualizarUsuario({ ...usuario, plano: "gratuito" });
    } catch (e) {
      setErro(e instanceof ApiError ? e.message : "Não foi possível cancelar agora. Tente novamente.");
    } finally {
      setProcessando(false);
    }
  }

  return (
    <div className="container container--estreito pagina-premium">
      <div className="premium-aviso-simulacao" role="note">
        <strong>Pagamento em integração</strong> — nesta versão de apresentação do TCC, a
        assinatura é de teste: os recursos premium são liberados, mas nenhum valor é cobrado
        ainda. Você será avisado antes de qualquer cobrança real.
      </div>

      <div className="cartao premium-card">
        <span className="rotulo-tag">{ehPremium ? "Seu plano atual" : "Upgrade"}</span>
        <h1>{ehPremium ? "Você já é premium" : "NeuroClass Premium"}</h1>
        <p className="premium-card__preco">
          {ehPremium ? "Aproveite todos os recursos abaixo." : "R$ 9,99/mês"}
        </p>

        {!ehPremium && (
          <p className="premium-card__detalhe">
            Cobrança mensal, cancele quando quiser. Conteúdo, quiz e ferramentas de rotina
            continuam gratuitos.
          </p>
        )}

        <ul className="premium-lista-beneficios">
          {BENEFICIOS.map((b) => (
            <li key={b.texto}>
              <Icone nome={b.icone} />
              {b.texto}
            </li>
          ))}
        </ul>

        {erro && (
          <p className="mensagem-erro" role="alert">
            {erro}
          </p>
        )}

        {ehPremium ? (
          <div className="premium-acoes">
            <Link to="/planejamento/calendario" className="botao botao--primario botao--largo">
              Ir para exportação de calendário
            </Link>
            <button
              type="button"
              className="botao-cancelar-premium"
              onClick={cancelar}
              disabled={processando}
            >
              {processando ? "Cancelando..." : "Cancelar plano premium"}
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="botao botao--primario botao--grande botao--largo"
            onClick={ativar}
            disabled={processando}
          >
            {processando ? "Processando..." : "Assinar Premium — R$ 9,99/mês"}
          </button>
        )}
      </div>
    </div>
  );
}
