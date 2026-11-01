import { Link } from "react-router-dom";
import "./Home.css";
import Icone from "../components/Icone";
import { MOSAICO } from "../data/mosaico";

const RECURSOS = [
  {
    icone: "livro",
    titulo: "Conteúdo educativo",
    texto:
      "Explicações claras sobre o que é o TDAH, seus sintomas, desafios escolares comuns e estratégias de apoio — sempre com a fonte científica citada.",
    para: "/conteudo",
    cor: "amarelo",
    variante: "bloco--azul",
  },
  {
    icone: "quiz",
    titulo: "Quiz interativo",
    texto:
      "Teste seus conhecimentos em três níveis de dificuldade, com feedback imediato e explicação de cada resposta.",
    para: "/quiz",
    cor: "rosa",
    variante: "bloco--claro",
  },
  {
    icone: "proibido",
    titulo: "Mitos x fatos",
    texto:
      "Desconstruímos ideias equivocadas comuns sobre o TDAH com base em evidências científicas atuais.",
    para: "/conteudo/mitos-e-fatos",
    cor: "verde",
    variante: "bloco--escuro",
  },
  {
    icone: "calendario",
    titulo: "Ferramentas para o dia a dia",
    texto:
      "Organize tarefas, monte sua rotina escolar e use o modo foco para se concentrar em uma atividade por vez.",
    para: "/ferramentas",
    cor: "lilas",
    variante: "bloco--claro",
  },
];

export default function Home() {
  return (
    <div className="pagina-home">
      <section className="container home-hero">
        <div className="home-hero__conteudo">
          <span className="rotulo-tag">Plataforma educativa sobre TDAH</span>
          <h1 className="home-hero__titulo">
            Entenda o TDAH com conteúdo confiável e testes seus conhecimentos
          </h1>
          <p className="home-hero__descricao">
            O NeuroClass reúne conteúdo educativo com base científica sobre o Transtorno do
            Déficit de Atenção e Hiperatividade, pensado para estudantes, educadores e famílias.
            Explore os materiais e teste o que aprendeu em nosso quiz interativo.
          </p>
          <div className="home-hero__acoes">
            <Link to="/conteudo" className="botao botao--primario botao--grande">
              Explorar conteúdo
            </Link>
            <Link to="/quiz" className="botao botao--secundario botao--grande">
              Fazer o quiz
            </Link>
          </div>
        </div>
        <nav className="home-mosaico" aria-label="Atalhos por tema">
          {MOSAICO.map((bloco) => (
            <Link
              key={bloco.rotulo}
              to={bloco.para}
              className="bloco home-mosaico__bloco"
              style={{ "--cor": `var(--bloco-${bloco.cor})` }}
            >
              {bloco.rotulo}
            </Link>
          ))}
        </nav>
      </section>

      <section className="container home-secao">
        <h2 className="home-secao__titulo">O que você encontra aqui</h2>
        <div className="home-cards">
          {RECURSOS.map((recurso) => (
            <Link
              key={recurso.titulo}
              to={recurso.para}
              className={`bloco ${recurso.variante} home-card`}
              style={{ "--cor": `var(--bloco-${recurso.cor})` }}
            >
              <span className="home-card__icone" aria-hidden="true">
                <Icone nome={recurso.icone} />
              </span>
              <h3>{recurso.titulo}</h3>
              <p>{recurso.texto}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container home-aviso">
        <p>
          <strong>Importante:</strong> o conteúdo deste site tem finalidade educativa. Ele não
          substitui uma avaliação profissional. O diagnóstico do TDAH deve ser sempre feito por
          um profissional de saúde qualificado.
        </p>
      </section>
    </div>
  );
}
