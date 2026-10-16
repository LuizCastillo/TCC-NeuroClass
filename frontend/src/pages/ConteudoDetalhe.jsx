import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ARTIGOS, buscarArtigoPorSlug } from "../data/conteudo";
import { desmarcarLido, lerLidos, marcarLido } from "../data/leitura";
import BlocosConteudo, { idSecao } from "../components/BlocosConteudo";
import "./Conteudo.css";

export default function ConteudoDetalhe() {
  const { slug } = useParams();
  const artigo = buscarArtigoPorSlug(slug);
  const [lido, setLido] = useState(false);
  const [progresso, setProgresso] = useState(0);

  useEffect(() => {
    setLido(lerLidos().includes(slug));
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    function aoRolar() {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgresso(total > 0 ? Math.min(100, Math.round((window.scrollY / total) * 100)) : 100);
    }
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, [slug]);

  if (!artigo) {
    return (
      <div className="container pagina-artigo__nao-encontrado">
        <h1>Artigo não encontrado</h1>
        <p>O conteúdo que você procura não existe ou foi movido.</p>
        <Link to="/conteudo" className="botao botao--primario">
          Voltar ao conteúdo
        </Link>
      </div>
    );
  }

  const indice = ARTIGOS.findIndex((a) => a.slug === slug);
  const proximo = ARTIGOS[(indice + 1) % ARTIGOS.length];
  const secoes = artigo.blocos.filter((b) => b.tipo === "secao");

  function alternarLido() {
    if (lido) desmarcarLido(slug);
    else marcarLido(slug);
    setLido(!lido);
  }

  return (
    <>
      <div className="leitura-barra" aria-hidden="true">
        <div className="leitura-barra__preenchimento" style={{ width: `${progresso}%` }} />
      </div>
      <div className={`container container--estreito pagina-artigo artigo--${artigo.cor}`}>
        <Link to="/conteudo" className="pagina-artigo__voltar">
          ← Voltar ao conteúdo
        </Link>

        <header className="artigo-cabecalho">
          <span className="artigo-cabecalho__numero">
            Artigo {indice + 1} de {ARTIGOS.length}
          </span>
          <h1>{artigo.titulo}</h1>
          <p className="artigo-cabecalho__gancho">{artigo.gancho}</p>
          <p className="artigo-cabecalho__meta">{artigo.minutos} min de leitura</p>
        </header>

        {secoes.length > 1 && (
          <nav className="artigo-indice" aria-label="Neste artigo">
            <span>Neste artigo</span>
            {secoes.map((s) => (
              <a key={s.titulo} href={`#${idSecao(s.titulo)}`}>
                {s.titulo}
              </a>
            ))}
          </nav>
        )}

        <BlocosConteudo blocos={artigo.blocos} />

        <p className="pagina-artigo__fonte">Fonte: {artigo.fonte}</p>

        <div className="artigo-rodape">
          <button
            type="button"
            className={"botao " + (lido ? "botao--secundario" : "botao--primario")}
            onClick={alternarLido}
            aria-pressed={lido}
          >
            {lido ? "Marcado como lido (desfazer)" : "Marcar como lido"}
          </button>
          <Link to="/quiz" className="botao botao--secundario">
            Testar o que aprendi no quiz
          </Link>
        </div>

        <Link to={`/conteudo/${proximo.slug}`} className="artigo-proximo">
          <span>Próximo artigo</span>
          <strong>{proximo.titulo}</strong>
        </Link>
      </div>
    </>
  );
}
