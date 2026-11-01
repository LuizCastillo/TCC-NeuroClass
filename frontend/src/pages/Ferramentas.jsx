import { Link } from "react-router-dom";
import "./Ferramentas.css";
import Icone from "../components/Icone";

const FERRAMENTAS = [
  {
    cor: "amarelo",
    variante: "bloco--azul",
    icone: "lista",
    titulo: "Organizar minhas tarefas",
    descricao: "Transforme suas atividades em tarefas menores e mais fáceis de acompanhar.",
    botao: "Organizar tarefas",
    para: "/planejamento",
  },
  {
    cor: "rosa",
    variante: "bloco--claro",
    icone: "calendario",
    titulo: "Criar minha rotina",
    descricao: "Monte uma rotina personalizada com horários, tarefas, pausas e prioridades.",
    botao: "Criar rotina",
    para: "/planejamento",
  },
  {
    cor: "agua",
    variante: "bloco--escuro",
    icone: "relogio",
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
          <Link
            key={f.titulo}
            to={f.para}
            className={`bloco ${f.variante} ferramenta-card`}
            style={{ "--cor": `var(--bloco-${f.cor})` }}
          >
            <span className="ferramenta-card__icone" aria-hidden="true">
              <Icone nome={f.icone} />
            </span>
            <h2>{f.titulo}</h2>
            <p>{f.descricao}</p>
            <span className="ferramenta-card__acao">{f.botao}</span>
          </Link>
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
