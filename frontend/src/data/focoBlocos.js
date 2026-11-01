const TOTAL_BLOCOS = 20;

/** Quantos dos 20 blocos do Modo foco já se apagaram. */
export function blocosApagados(restante, total) {
  if (total <= 0) return 0;
  return Math.floor((1 - restante / total) * TOTAL_BLOCOS);
}
