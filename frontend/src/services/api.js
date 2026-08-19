/**
 * Camada de acesso à API do backend (Manual, Parte VII, capítulo 46).
 * Centraliza todas as chamadas HTTP em um único lugar, para que componentes
 * e páginas nunca façam fetch diretamente.
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

class ApiError extends Error {
  constructor(mensagem, status) {
    super(mensagem);
    this.status = status;
  }
}

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    // resposta sem corpo (ex.: alguns 204)
  }

  if (!response.ok) {
    const mensagem =
      data?.mensagem || "Não foi possível completar sua solicitação. Tente novamente em instantes.";
    throw new ApiError(mensagem, response.status);
  }

  return data;
}

export const api = {
  criarUsuario: (nome, email) =>
    request("/usuarios", { method: "POST", body: JSON.stringify({ nome, email }) }),

  iniciarTentativa: (usuarioId, dificuldade) =>
    request("/quiz/iniciar", {
      method: "POST",
      body: JSON.stringify({ usuario_id: usuarioId, dificuldade }),
    }),

  responderQuestao: (tentativaId, questaoId, alternativaId) =>
    request("/quiz/responder", {
      method: "POST",
      body: JSON.stringify({
        tentativa_id: tentativaId,
        questao_id: questaoId,
        alternativa_id: alternativaId,
      }),
    }),

  finalizarTentativa: (tentativaId) =>
    request("/quiz/finalizar", {
      method: "POST",
      body: JSON.stringify({ tentativa_id: tentativaId }),
    }),

  obterResultado: (tentativaId) => request(`/quiz/resultado/${tentativaId}`),
};

export { ApiError };
