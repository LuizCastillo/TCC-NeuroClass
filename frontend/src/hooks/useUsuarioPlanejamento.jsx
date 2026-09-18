import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

const CHAVE_STORAGE = "neuroclass_usuario";

/**
 * Identifica o usuário das ferramentas de organização/rotina.
 *
 * O NeuroClass não tem sistema de login — o usuário é identificado da
 * mesma forma que no quiz (nome + e-mail, via POST /usuarios). Este
 * contexto guarda esse usuário no localStorage para que a rotina continue
 * disponível entre visitas no mesmo dispositivo, sem exigir novo cadastro
 * a cada vez, e compartilha esse estado entre todas as páginas da
 * ferramenta (evita duas instâncias de estado dessincronizadas).
 */
const UsuarioPlanejamentoContext = createContext(null);

export function UsuarioPlanejamentoProvider({ children }) {
  const [usuario, setUsuarioState] = useState(null);
  const [carregandoInicial, setCarregandoInicial] = useState(true);

  useEffect(() => {
    try {
      const salvo = localStorage.getItem(CHAVE_STORAGE);
      if (salvo) setUsuarioState(JSON.parse(salvo));
    } catch {
      // localStorage indisponível ou dado corrompido — segue sem usuário salvo
    }
    setCarregandoInicial(false);
  }, []);

  const identificar = useCallback(async (nome, email) => {
    const usuarioCriado = await api.criarUsuario(nome, email);
    try {
      localStorage.setItem(CHAVE_STORAGE, JSON.stringify(usuarioCriado));
    } catch {
      // se não der para persistir, a sessão atual ainda funciona
    }
    setUsuarioState(usuarioCriado);
    return usuarioCriado;
  }, []);

  const esquecer = useCallback(() => {
    try {
      localStorage.removeItem(CHAVE_STORAGE);
    } catch {
      // ignora
    }
    setUsuarioState(null);
  }, []);

  const value = { usuario, carregandoInicial, identificar, esquecer };
  return (
    <UsuarioPlanejamentoContext.Provider value={value}>
      {children}
    </UsuarioPlanejamentoContext.Provider>
  );
}

export function useUsuarioPlanejamento() {
  const ctx = useContext(UsuarioPlanejamentoContext);
  if (!ctx) {
    throw new Error(
      "useUsuarioPlanejamento precisa ser usado dentro de um UsuarioPlanejamentoProvider"
    );
  }
  return ctx;
}
