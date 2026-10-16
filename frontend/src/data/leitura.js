// Progresso de leitura guardado só no navegador (localStorage), sem dados pessoais.
const CHAVE = "neuroclass_artigos_lidos";

export function lerLidos() {
  try {
    const v = JSON.parse(localStorage.getItem(CHAVE) || "[]");
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

export function marcarLido(slug) {
  try {
    const v = lerLidos();
    if (!v.includes(slug)) localStorage.setItem(CHAVE, JSON.stringify([...v, slug]));
  } catch {
    // sem localStorage: segue sem persistir
  }
}

export function desmarcarLido(slug) {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(lerLidos().filter((s) => s !== slug)));
  } catch {
    // ignora
  }
}
