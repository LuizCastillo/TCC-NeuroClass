import { useState } from "react";

/** Renderiza a lista de blocos de um artigo (ver data/conteudo.js). */
export default function BlocosConteudo({ blocos }) {
  return (
    <div className="blocos">
      {blocos.map((b, i) => (
        <Bloco key={i} bloco={b} />
      ))}
    </div>
  );
}

function Bloco({ bloco }) {
  switch (bloco.tipo) {
    case "resumo":
      return (
        <aside className="bloco-resumo" aria-label="Em resumo">
          <p className="bloco-resumo__titulo">Em resumo</p>
          <ul>
            {bloco.itens.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </aside>
      );
    case "secao":
      return (
        <section className="bloco-secao" id={idSecao(bloco.titulo)}>
          <h2>{bloco.titulo}</h2>
          {bloco.texto && <p>{bloco.texto}</p>}
        </section>
      );
    case "cartoes":
      return (
        <ul
          className={
            "bloco-cartoes" +
            (bloco.colunas === 1 ? " bloco-cartoes--lista" : "") +
            (bloco.itens.length === 2 ? " bloco-cartoes--dois" : "")
          }
        >
          {bloco.itens.map((it, idx) => (
            <li key={it.titulo} className="bloco-cartao">
              {bloco.numerado && <span className="bloco-cartao__num">{idx + 1}</span>}
              <div>
                <h3>{it.titulo}</h3>
                <p>{it.texto}</p>
              </div>
            </li>
          ))}
        </ul>
      );
    case "destaque":
      return (
        <div className="bloco-destaque">
          <span className="bloco-destaque__rotulo">{bloco.rotulo}</span>
          <h3>{bloco.titulo}</h3>
          <p>{bloco.texto}</p>
        </div>
      );
    case "estatistica":
      return (
        <div className="bloco-estatistica">
          <span className="bloco-estatistica__numero">{bloco.numero}</span>
          <p>{bloco.texto}</p>
        </div>
      );
    case "numeros":
      return (
        <div className="bloco-numeros">
          {bloco.itens.map((n) => (
            <div key={n.numero} className="bloco-numeros__item">
              <span className="bloco-numeros__valor">{n.numero}</span>
              <p>{n.texto}</p>
            </div>
          ))}
        </div>
      );
    case "sanfona":
      return <Sanfona bloco={bloco} />;
    case "mitofato":
      return (
        <div className="bloco-mitofato">
          {bloco.itens.map((it, idx) => (
            <CartaoMitoFato key={idx} item={it} numero={idx + 1} />
          ))}
        </div>
      );
    default:
      return null;
  }
}

export function idSecao(titulo) {
  return (
    "s-" +
    titulo
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  );
}

function Sanfona({ bloco }) {
  const [aberta, setAberta] = useState(false);
  return (
    <div className={"bloco-sanfona" + (aberta ? " bloco-sanfona--aberta" : "")}>
      <button
        type="button"
        className="bloco-sanfona__botao"
        aria-expanded={aberta}
        onClick={() => setAberta((v) => !v)}
      >
        <span>{bloco.titulo}</span>
        <span className="bloco-sanfona__seta" aria-hidden="true" />
      </button>
      {aberta && (
        <ul className="bloco-sanfona__lista">
          {bloco.itens.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function CartaoMitoFato({ item, numero }) {
  const [revelado, setRevelado] = useState(false);
  return (
    <div className={"mitofato" + (revelado ? " mitofato--revelado" : "")}>
      <p className="mitofato__rotulo">Afirmação {numero}</p>
      <p className="mitofato__mito">&ldquo;{item.mito}&rdquo;</p>
      {revelado ? (
        <div className="mitofato__resposta" role="status">
          <span className="mitofato__selo">MITO</span>
          <p>{item.fato}</p>
        </div>
      ) : (
        <button type="button" className="botao botao--secundario" onClick={() => setRevelado(true)}>
          Ver a resposta
        </button>
      )}
    </div>
  );
}
