import "./AlternativaBotao.css";
import Icone from "./Icone";

/**
 * Botão de alternativa do quiz. Estados visuais (Manual, capítulo 56):
 * - neutro: antes de responder
 * - selecionada-correta / selecionada-incorreta: após responder, na alternativa clicada
 * - correta-revelada: quando o usuário errou, destaca qual era a correta
 * - desabilitada: as demais alternativas ficam desabilitadas após a resposta
 */
export default function AlternativaBotao({
  texto,
  letra,
  onClick,
  respondida,
  ehSelecionada,
  ehCorreta,
}) {
  let estado = "neutro";
  if (respondida) {
    if (ehSelecionada && ehCorreta) estado = "correta";
    else if (ehSelecionada && !ehCorreta) estado = "incorreta";
    else if (!ehSelecionada && ehCorreta) estado = "correta-revelada";
    else estado = "desabilitada";
  }

  return (
    <button
      type="button"
      className={`alternativa alternativa--${estado}`}
      onClick={onClick}
      disabled={respondida}
      aria-pressed={ehSelecionada}
    >
      <span className="alternativa__letra">{letra}</span>
      <span className="alternativa__texto">{texto}</span>
      {estado === "correta" && (
        <span className="alternativa__icone" aria-hidden="true">
          <Icone nome="check" />
        </span>
      )}
      {estado === "incorreta" && (
        <span className="alternativa__icone" aria-hidden="true">
          <Icone nome="fechar" />
        </span>
      )}
      {estado === "correta-revelada" && (
        <span className="alternativa__icone" aria-hidden="true">
          <Icone nome="check" />
        </span>
      )}
    </button>
  );
}
