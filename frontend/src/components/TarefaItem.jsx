import "./TarefaItem.css";

const CATEGORIA_ICONE = {
  estudos: "📚",
  trabalhos: "📝",
  escola: "🏫",
  leitura: "📖",
  projetos: "💻",
  outros: "📌",
};

const PRIORIDADE_ROTULO = { baixa: "Baixa", media: "Média", alta: "Alta" };

function formatarHorario(horario) {
  if (!horario) return null;
  // horario vem como "HH:MM:SS" do backend
  return horario.slice(0, 5);
}

export default function TarefaItem({ tarefa, onAlternarConcluida, onAbrir }) {
  const subtarefasConcluidas = tarefa.subtarefas.filter((s) => s.concluida).length;
  const totalSubtarefas = tarefa.subtarefas.length;

  return (
    <li className={"tarefa-item" + (tarefa.concluida ? " tarefa-item--concluida" : "")}>
      <button
        type="button"
        className="tarefa-item__checkbox"
        onClick={() => onAlternarConcluida(tarefa)}
        aria-pressed={tarefa.concluida}
        aria-label={tarefa.concluida ? "Marcar como não concluída" : "Marcar como concluída"}
      >
        {tarefa.concluida ? "✓" : ""}
      </button>

      <button type="button" className="tarefa-item__conteudo" onClick={() => onAbrir(tarefa)}>
        <div className="tarefa-item__linha-principal">
          {formatarHorario(tarefa.horario) && (
            <span className="tarefa-item__horario">{formatarHorario(tarefa.horario)}</span>
          )}
          <span className="tarefa-item__icone" aria-hidden="true">
            {CATEGORIA_ICONE[tarefa.categoria]}
          </span>
          <span className="tarefa-item__titulo">{tarefa.titulo}</span>
        </div>
        <div className="tarefa-item__meta">
          {tarefa.duracao_minutos && <span>{tarefa.duracao_minutos} min</span>}
          <span className={`tarefa-item__prioridade tarefa-item__prioridade--${tarefa.prioridade}`}>
            {PRIORIDADE_ROTULO[tarefa.prioridade]}
          </span>
          {totalSubtarefas > 0 && (
            <span>
              {subtarefasConcluidas} de {totalSubtarefas} etapas
            </span>
          )}
        </div>
      </button>
    </li>
  );
}
