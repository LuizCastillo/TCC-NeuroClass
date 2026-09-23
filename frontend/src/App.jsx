import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Conteudo from "./pages/Conteudo";
import ConteudoDetalhe from "./pages/ConteudoDetalhe";
import QuizCadastro from "./pages/QuizCadastro";
import QuizJogar from "./pages/QuizJogar";
import QuizResultado from "./pages/QuizResultado";
import Ferramentas from "./pages/Ferramentas";
import Planejamento from "./pages/Planejamento";
import PlanejamentoNova from "./pages/PlanejamentoNova";
import PlanejamentoDetalhe from "./pages/PlanejamentoDetalhe";
import Foco from "./pages/Foco";
import Premium from "./pages/Premium";
import PlanejamentoCalendario from "./pages/PlanejamentoCalendario";
import Privacidade from "./pages/Privacidade";
import Termos from "./pages/Termos";
import { QuizProvider } from "./hooks/useQuizContext";
import { UsuarioPlanejamentoProvider } from "./hooks/useUsuarioPlanejamento";

export default function App() {
  return (
    <BrowserRouter>
      <QuizProvider>
        <UsuarioPlanejamentoProvider>
          <Header />
          <main className="main-conteudo">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/conteudo" element={<Conteudo />} />
              <Route path="/conteudo/:slug" element={<ConteudoDetalhe />} />
              <Route path="/quiz" element={<QuizCadastro />} />
              <Route path="/quiz/jogar" element={<QuizJogar />} />
              <Route path="/quiz/resultado/:tentativaId" element={<QuizResultado />} />
              <Route path="/ferramentas" element={<Ferramentas />} />
              <Route path="/planejamento" element={<Planejamento />} />
              <Route path="/planejamento/nova" element={<PlanejamentoNova />} />
              <Route path="/planejamento/calendario" element={<PlanejamentoCalendario />} />
              <Route path="/planejamento/:id" element={<PlanejamentoDetalhe />} />
              <Route path="/foco" element={<Foco />} />
              <Route path="/premium" element={<Premium />} />
              <Route path="/privacidade" element={<Privacidade />} />
              <Route path="/termos" element={<Termos />} />
            </Routes>
          </main>
          <Footer />
        </UsuarioPlanejamentoProvider>
      </QuizProvider>
    </BrowserRouter>
  );
}
