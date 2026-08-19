import { Link } from "react-router-dom";
import { ARTIGOS } from "../data/conteudo";
import "./Conteudo.css";

export default function Conteudo() {
  return (
    <div className="container pagina-conteudo">
      <header className="pagina-conteudo__cabecalho">
        <h1>Conteúdo educativo</h1>
        <p>
          Materiais com base científica sobre o TDAH, pensados para estudantes, educadores e
          famílias. Toda informação apresentada cita sua fonte de origem.
        </p>
      </header>

      <div className="lista-artigos">
        {ARTIGOS.map((artigo) => (
          <Link key={artigo.slug} to={`/conteudo/${artigo.slug}`} className="cartao artigo-card">
            <h2>{artigo.titulo}</h2>
            <p>{artigo.resumo}</p>
            <span className="artigo-card__link">Ler mais →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
