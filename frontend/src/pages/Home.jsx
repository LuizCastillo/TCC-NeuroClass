import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="pagina-home">
      <section className="home-hero">
        <div className="container container--estreito home-hero__conteudo">
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
      </section>

      <section className="container home-secao">
        <h2 className="home-secao__titulo">O que você encontra aqui</h2>
        <div className="home-cards">
          <div className="cartao home-card">
            <span className="home-card__icone" aria-hidden="true">
              📚
            </span>
            <h3>Conteúdo educativo</h3>
            <p>
              Explicações claras sobre o que é o TDAH, seus sintomas, desafios escolares comuns e
              estratégias de apoio — sempre com a fonte científica citada.
            </p>
          </div>
          <div className="cartao home-card">
            <span className="home-card__icone" aria-hidden="true">
              ✅
            </span>
            <h3>Quiz interativo</h3>
            <p>
              Teste seus conhecimentos em três níveis de dificuldade, com feedback imediato e
              explicação de cada resposta.
            </p>
          </div>
          <div className="cartao home-card">
            <span className="home-card__icone" aria-hidden="true">
              🚫
            </span>
            <h3>Mitos x fatos</h3>
            <p>
              Desconstruímos ideias equivocadas comuns sobre o TDAH com base em evidências
              científicas atuais.
            </p>
          </div>
          <div className="cartao home-card">
            <span className="home-card__icone" aria-hidden="true">
              🗓️
            </span>
            <h3>Ferramentas para o dia a dia</h3>
            <p>
              Organize tarefas, monte sua rotina escolar e use o modo foco para se concentrar em
              uma atividade por vez.
            </p>
          </div>
        </div>
      </section>

      <section className="container container--estreito home-aviso">
        <p>
          <strong>Importante:</strong> o conteúdo deste site tem finalidade educativa. Ele não
          substitui uma avaliação profissional. O diagnóstico do TDAH deve ser sempre feito por
          um profissional de saúde qualificado.
        </p>
      </section>
    </div>
  );
}
