import "./BarraProgresso.css";

export default function BarraProgresso({ atual, total }) {
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
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={
              "barra-progresso__bloco" +
              (i + 1 < atual ? " barra-progresso__bloco--feito" : "") +
              (i + 1 === atual ? " barra-progresso__bloco--atual" : "")
            }
          />
        ))}
      </div>
      <span className="barra-progresso__texto">
        Questão {atual} de {total}
      </span>
    </div>
  );
}
