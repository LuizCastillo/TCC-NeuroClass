import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Conteudo from "./pages/Conteudo";
import ConteudoDetalhe from "./pages/ConteudoDetalhe";
import QuizCadastro from "./pages/QuizCadastro";
import QuizJogar from "./pages/QuizJogar";
import QuizResultado from "./pages/QuizResultado";
import Psicologa from "./pages/Psicologa";
import { QuizProvider } from "./hooks/useQuizContext";

export default function App() {
  return (
    <BrowserRouter>
      <QuizProvider>
        <Header />
        <main className="main-conteudo">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/conteudo" element={<Conteudo />} />
            <Route path="/conteudo/:slug" element={<ConteudoDetalhe />} />
            <Route path="/quiz" element={<QuizCadastro />} />
            <Route path="/quiz/jogar" element={<QuizJogar />} />
            <Route path="/quiz/resultado/:tentativaId" element={<QuizResultado />} />
            <Route path="/psicologa" element={<Psicologa />} />
          </Routes>
        </main>
        <Footer />
      </QuizProvider>
    </BrowserRouter>
  );
}
