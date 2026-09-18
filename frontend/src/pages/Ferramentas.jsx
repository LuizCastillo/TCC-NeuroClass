import { Link } from "react-router-dom";
import "./Ferramentas.css";

const FERRAMENTAS = [
  {
    icone: "📋",
    titulo: "Organizar minhas tarefas",
    descricao: "Transforme suas atividades em tarefas menores e mais fáceis de acompanhar.",
    botao: "Organizar tarefas",
    para: "/planejamento",
  },
  {
    icone: "🗓️",
    titulo: "Criar minha rotina",
    descricao: "Monte uma rotina personalizada com horários, tarefas, pausas e prioridades.",
    botao: "Criar rotina",
    para: "/planejamento",
  },
  {
    icone: "⏱️",
    titulo: "Modo foco",
    descricao: "Concentre-se em uma tarefa por vez usando um temporizador simples.",
    botao: "Começar foco",
    para: "/foco",
  },
];

export default function Ferramentas() {
  return (
    <div className="container pagina-ferramentas">
      <header className="pagina-ferramentas__cabecalho">
        <h1>Ferramentas para o dia a dia</h1>
        <p>Recursos para ajudar na organização, no planejamento e na rotina escolar.</p>
      </header>

      <div className="ferramentas-grade">
        {FERRAMENTAS.map((f) => (
          <div key={f.titulo} className="cartao ferramenta-card">
            <span className="ferramenta-card__icone" aria-hidden="true">
              {f.icone}
            </span>
            <h2>{f.titulo}</h2>
            <p>{f.descricao}</p>
            <Link to={f.para} className="botao botao--primario ferramenta-card__botao">
              {f.botao}
            </Link>
          </div>
        ))}
      </div>

      <div className="cartao ferramentas-aviso">
        <p>
          Essas ferramentas têm finalidade educacional, de apoio à organização, ao planejamento e
          à rotina escolar. Elas não diagnosticam, tratam ou substituem acompanhamento
          profissional para TDAH.
        </p>
      </div>
    </div>
  );
}
