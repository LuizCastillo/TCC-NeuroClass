import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, ApiError } from "../services/api";
import { useUsuarioPlanejamento } from "../hooks/useUsuarioPlanejamento";
import IdentificacaoUsuario from "../components/IdentificacaoUsuario";
import "./PlanejamentoCalendario.css";

const TEMAS = [
  { valor: "azul", rotulo: "Azul", cor: "#1d4ed8" },
  { valor: "verde", rotulo: "Verde", cor: "#16a34a" },
  { valor: "roxo", rotulo: "Roxo", cor: "#7c3aed" },
  { valor: "laranja", rotulo: "Laranja", cor: "#ea580c" },
];

const GUIAS = {
  google: {
    rotulo: "Google Calendar",
    passos: [
      "Acesse calendar.google.com e faça login normalmente.",
      'No menu à esquerda, ao lado de "Outros calendários", clique no ícone "+".',
      'Selecione a opção "A partir da URL".',
      'Cole o link copiado acima no campo, e clique em "Adicionar calendário".',
    ],
    observacao:
      "O Google atualiza calendários importados por link a cada 12–24 horas — não é instantâneo. Se você criar uma tarefa nova, pode levar um tempo para aparecer lá.",
  },
  apple: {
    rotulo: "Apple Calendar",
    passos: [
      "No Mac: abra o app Calendário e vá em Arquivo → Nova assinatura de calendário.",
      "No iPhone/iPad: vá em Ajustes → Calendário → Contas → Adicionar Conta → Outra → Adicionar Calend. de Assinatura.",
      "Cole o link copiado acima no campo indicado.",
      'Confirme tocando em "Assinar" (Mac) ou "Avançar" e depois "Salvar" (iPhone/iPad).',
    ],
    observacao: "Você pode escolher a frequência de atualização automática nas opções da assinatura.",
  },
  outlook: {
    rotulo: "Outlook",
    passos: [
      "Acesse outlook.com/calendar e faça login.",
      'Clique em "Adicionar calendário" e depois em "Assinar da web".',
      "Cole o link copiado acima no campo de URL.",
      "Dê um nome ao calendário (ex: Rotina NeuroClass) e clique em Importar.",
    ],
    observacao: "",
  },
};

function GuiaExportacao({ link }) {
  const [plataforma, setPlataforma] = useState(null);
  const guia = plataforma ? GUIAS[plataforma] : null;

  return (
    <div className="guia-exportacao">
      <p className="guia-exportacao__pergunta">Como colocar esse link no seu calendário?</p>
      <div className="guia-exportacao__abas" role="tablist" aria-label="Escolha seu aplicativo de calendário">
        {Object.entries(GUIAS).map(([chave, g]) => (
          <button
            key={chave}
            type="button"
            role="tab"
            aria-selected={plataforma === chave}
            className={"guia-exportacao__aba" + (plataforma === chave ? " guia-exportacao__aba--ativa" : "")}
            onClick={() => setPlataforma(plataforma === chave ? null : chave)}
          >
            {g.rotulo}
          </button>
        ))}
      </div>

      {guia && (
        <div className="guia-exportacao__conteudo" role="tabpanel">
          <ol className="guia-exportacao__passos">
            {guia.passos.map((passo, i) => (
              <li key={i}>{passo}</li>
            ))}
          </ol>
          {guia.observacao && <p className="guia-exportacao__observacao">{guia.observacao}</p>}
          {!link && (
            <p className="guia-exportacao__observacao">
              Gere o link acima primeiro — você vai precisar dele no passo de colar a URL.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function PromoPremium() {
  return (
    <div className="container container--estreito pagina-calendario">
      <div className="cartao promo-premium">
        <span aria-hidden="true" className="promo-premium__icone">
          🔒
        </span>
        <h1>Recurso premium</h1>
        <p>
          Exportar sua rotina para Google Calendar, Apple Calendar ou Outlook, e personalizar a
          cor do site, são recursos exclusivos do plano premium.
        </p>
        <Link to="/premium" className="botao botao--primario botao--grande">
          Ver plano premium
        </Link>
      </div>
    </div>
  );
}

export default function PlanejamentoCalendario() {
  const { usuario, carregandoInicial, atualizarUsuario } = useUsuarioPlanejamento();
  const [link, setLink] = useState("");
  const [carregandoLink, setCarregandoLink] = useState(true);
  const [erro, setErro] = useState("");
  const [copiado, setCopiado] = useState(false);
  const [salvandoTema, setSalvandoTema] = useState(false);

  useEffect(() => {
    if (!usuario || usuario.plano !== "premium") {
      setCarregandoLink(false);
      return;
    }
    api
      .obterLinkCalendario(usuario.id)
      .then((res) => setLink(new URL(res.url, window.location.origin).href))
      .catch((e) => setErro(e instanceof ApiError ? e.message : "Não foi possível gerar o link."))
      .finally(() => setCarregandoLink(false));
  }, [usuario]);

  if (carregandoInicial) return null;
  if (!usuario) return <IdentificacaoUsuario onIdentificado={() => {}} />;
  if (usuario.plano !== "premium") return <PromoPremium />;

  async function regenerarLink() {
    setCarregandoLink(true);
    setErro("");
    try {
      const res = await api.regenerarLinkCalendario(usuario.id);
      setLink(new URL(res.url, window.location.origin).href);
    } catch (e) {
      setErro(e instanceof ApiError ? e.message : "Não foi possível gerar um novo link.");
    } finally {
      setCarregandoLink(false);
    }
  }

  async function copiarLink() {
    try {
      await navigator.clipboard.writeText(link);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // navegador sem suporte a clipboard — usuário pode selecionar manualmente
    }
  }

  async function escolherTema(tema) {
    setSalvandoTema(true);
    try {
      await api.atualizarTema(usuario.id, tema);
      atualizarUsuario({ ...usuario, tema });
    } catch {
      // silencioso — tema é cosmético, não crítico
    } finally {
      setSalvandoTema(false);
    }
  }

  return (
    <div className="container container--estreito pagina-calendario">
      <Link to="/planejamento" className="pagina-calendario__voltar">
        ← Voltar
      </Link>
      <h1>Exportar rotina</h1>

      <div className="cartao calendario-secao">
        <h2>Opção 1 — Link de assinatura (.ics)</h2>
        <p>
          Cole este link no seu app de calendário para que sua rotina apareça lá automaticamente
          e se atualize sozinha. Funciona no Google Calendar ("Outros calendários" → "A partir da
          URL"), Apple Calendar e Outlook.
        </p>

        {carregandoLink ? (
          <p>Gerando link...</p>
        ) : (
          <>
            <div className="calendario-link-caixa">
              <input className="campo" type="text" value={link} readOnly />
              <button type="button" className="botao botao--secundario" onClick={copiarLink}>
                {copiado ? "Copiado!" : "Copiar"}
              </button>
            </div>
            <button type="button" className="calendario-regenerar" onClick={regenerarLink}>
              Gerar novo link (invalida o anterior)
            </button>
            <GuiaExportacao link={link} />
          </>
        )}

        <h2 className="calendario-secao__titulo-secundario">Opção 2 — Baixar arquivo .ics</h2>
        <p>Uma captura única da sua rotina atual, para importar manualmente onde quiser.</p>
        <a
          href={api.urlDownloadIcs(usuario.id)}
          className="botao botao--secundario"
          download="neuroclass-rotina.ics"
        >
          Baixar .ics
        </a>

        <h2 className="calendario-secao__titulo-secundario">Opção 3 — Conectar com Google Calendar</h2>
        <p className="calendario-em-breve">
          Integração direta e bidirecional com a conta do Google (via OAuth) está planejada para
          uma próxima etapa do projeto.
        </p>
      </div>

      {erro && (
        <p className="mensagem-erro" role="alert">
          {erro}
        </p>
      )}

      <div className="cartao calendario-secao">
        <h2>Cor de destaque do site</h2>
        <div className="opcoes-tema">
          {TEMAS.map((t) => (
            <button
              key={t.valor}
              type="button"
              className={"opcao-tema" + (usuario.tema === t.valor ? " opcao-tema--ativa" : "")}
              style={{ "--cor-tema": t.cor }}
              onClick={() => escolherTema(t.valor)}
              disabled={salvandoTema}
              aria-pressed={usuario.tema === t.valor}
            >
              <span className="opcao-tema__amostra" aria-hidden="true" />
              {t.rotulo}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
