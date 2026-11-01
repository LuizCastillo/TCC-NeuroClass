import { Link } from "react-router-dom";
import { ARTIGOS } from "../data/conteudo";
import { lerLidos } from "../data/leitura";
import "./Conteudo.css";

const CORES = ["amarelo", "rosa", "verde", "lilas"];
const VARIANTES = ["bloco--azul", "bloco--claro", "bloco--escuro", "bloco--claro"];

export default function Conteudo() {
  const lidos = lerLidos();
  const totalLidos = ARTIGOS.filter((a) => lidos.includes(a.slug)).length;
  const proximo = ARTIGOS.find((a) => !lidos.includes(a.slug)) || ARTIGOS[0];

  return (
    <div className="container pagina-conteudo">
      <header className="conteudo-hero">
        <div>
          <span className="rotulo-tag">Aprenda em blocos curtos</span>
          <h1>Conteúdo educativo</h1>
          <p>
            Materiais com base científica sobre o TDAH, pensados para estudantes, educadores e
            famílias. Cada artigo leva poucos minutos e cita sua fonte de origem.
          </p>
          <Link to={`/conteudo/${proximo.slug}`} className="botao botao--primario botao--grande">
            {totalLidos === 0 ? "Começar a ler" : totalLidos === ARTIGOS.length ? "Reler do início" : "Continuar lendo"}
          </Link>
        </div>
        <div className="conteudo-progresso" aria-label={`${totalLidos} de ${ARTIGOS.length} artigos lidos`}>
          <span className="conteudo-progresso__numero">
            {totalLidos}/{ARTIGOS.length}
          </span>
          <span className="conteudo-progresso__rotulo">artigos lidos</span>
          <div className="conteudo-progresso__blocos" aria-hidden="true">
            {ARTIGOS.map((a, i) => (
              <span
                key={a.slug}
                className={i < totalLidos ? "conteudo-progresso__bloco--lido" : undefined}
              />
            ))}
          </div>
        </div>
      </header>

      <div className="lista-artigos">
        {ARTIGOS.map((artigo, i) => (
          <Link
            key={artigo.slug}
            to={`/conteudo/${artigo.slug}`}
            className={`bloco ${VARIANTES[i % VARIANTES.length]} artigo-card`}
            style={{ "--cor": `var(--bloco-${CORES[i % CORES.length]})` }}
          >
            <div className="artigo-card__topo">
              <span className="artigo-card__numero">{String(i + 1).padStart(2, "0")}</span>
              {lidos.includes(artigo.slug) && <span className="artigo-card__lido">Lido</span>}
            </div>
            <h2>{artigo.titulo}</h2>
            <p>{artigo.gancho}</p>
            <div className="artigo-card__meta">
              <span>{artigo.minutos} min de leitura</span>
              <span className="artigo-card__link">Abrir</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
