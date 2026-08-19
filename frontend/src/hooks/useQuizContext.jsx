import { createContext, useContext, useState } from "react";

const QuizContext = createContext(null);

export function QuizProvider({ children }) {
  const [usuario, setUsuario] = useState(null); // { id, nome, email }
  const [tentativa, setTentativa] = useState(null); // { tentativa_id, dificuldade, questoes }

  const value = { usuario, setUsuario, tentativa, setTentativa };
  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuizContext() {
  const ctx = useContext(QuizContext);
  if (!ctx) {
    throw new Error("useQuizContext precisa ser usado dentro de um QuizProvider");
  }
  return ctx;
}
