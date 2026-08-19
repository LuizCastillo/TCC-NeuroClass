import "./BarraProgresso.css";

export default function BarraProgresso({ atual, total }) {
  const percentual = Math.round((atual / total) * 100);
  return (
    <div className="barra-progresso" role="group" aria-label="Progresso do quiz">
      <div
        className="barra-progresso__trilha"
        role="progressbar"
        aria-valuenow={atual}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`Questão ${atual} de ${total}`}
      >
        <div className="barra-progresso__preenchimento" style={{ width: `${percentual}%` }} />
      </div>
      <span className="barra-progresso__texto">
        Questão {atual} de {total}
      </span>
    </div>
  );
}
