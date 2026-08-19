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
          Coletamos apenas nome e e-mail para envio do resultado do quiz, em conformidade com a LGPD.
          Nenhum dado é compartilhado com terceiros.
        </p>
        <p className="rodape__creditos">
          Projeto de TCC — Etec Albert Einstein, Técnico em Informática para Internet, 2026.
        </p>
      </div>
    </footer>
  );
}
