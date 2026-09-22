import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="rodape">
      <div className="container rodape__conteudo">
        <p className="rodape__aviso">
          O NeuroClass tem finalidade exclusivamente educativa e não realiza diagnóstico de TDAH.
          Para avaliação profissional, procure um psiquiatra, neurologista ou psicólogo qualificado.
        </p>
        <p className="rodape__lgpd">
          Coletamos apenas nome e e-mail para identificar seu resultado do quiz e suas tarefas de
          organização, em conformidade com a LGPD.
        </p>
        <nav className="rodape__links" aria-label="Links legais">
          <Link to="/privacidade">Política de Privacidade</Link>
          <span aria-hidden="true">·</span>
          <Link to="/termos">Termos de Uso</Link>
        </nav>
        <p className="rodape__creditos">
          Projeto de TCC — Etec Albert Einstein, Técnico em Informática para Internet, 2026.
        </p>
      </div>
    </footer>
  );
}
