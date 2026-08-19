import { Link, useParams } from "react-router-dom";
import { buscarArtigoPorSlug } from "../data/conteudo";
import "./Conteudo.css";

export default function ConteudoDetalhe() {
  const { slug } = useParams();
  const artigo = buscarArtigoPorSlug(slug);

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

  return (
    <div className="container container--estreito pagina-artigo">
      <Link to="/conteudo" className="pagina-artigo__voltar">
        ← Voltar ao conteúdo
      </Link>
      <h1>{artigo.titulo}</h1>
      <p className="pagina-artigo__fonte">Fonte: {artigo.fonte}</p>
      <div className="pagina-artigo__corpo">
        {artigo.corpo.map((paragrafo, i) => (
          <p key={i}>{paragrafo}</p>
        ))}
      </div>
    </div>
  );
}
