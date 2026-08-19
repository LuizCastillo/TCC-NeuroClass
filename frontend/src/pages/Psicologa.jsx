import "./Psicologa.css";

export default function Psicologa() {
  return (
    <div className="container container--estreito pagina-psicologa">
      <h1>Fale com a psicóloga</h1>
      <p className="pagina-psicologa__intro">
        Assista ao vídeo institucional abaixo, com orientações de uma profissional de psicologia
        sobre o TDAH no contexto escolar.
      </p>

      <div className="cartao video-card">
        <div className="video-card__moldura">
          {/*
            RF11/capítulo 47: espaço reservado para o vídeo institucional
            gravado com a psicóloga parceira do projeto. Substitua o
            comentário abaixo por um elemento <video> ou <iframe> apontando
            para o arquivo/hospedagem definitivo do vídeo quando disponível.
          */}
          <div className="video-card__placeholder">
            <span aria-hidden="true">🎥</span>
            <p>Vídeo institucional em breve</p>
          </div>
        </div>
      </div>

      <div className="cartao psicologa-aviso">
        <p>
          Este conteúdo tem caráter informativo e não substitui uma consulta ou acompanhamento
          psicológico individual. Caso você ou alguém próximo precise de apoio profissional,
          procure um psicólogo ou psiquiatra de sua confiança.
        </p>
      </div>
    </div>
  );
}
