import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../services/api";
import { useUsuarioPlanejamento } from "../hooks/useUsuarioPlanejamento";
import "./Foco.css";

const DURACOES_FOCO = [15, 25, 45, 60];
const DURACOES_PAUSA = [5, 10, 15];

function formatarTempo(segundosTotais) {
  const minutos = Math.floor(segundosTotais / 60);
  const segundos = segundosTotais % 60;
  return `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
}

export default function Foco() {
  const { usuario } = useUsuarioPlanejamento();
  const [searchParams] = useSearchParams();
  const tarefaId = searchParams.get("tarefa");
  const tituloTarefa = searchParams.get("titulo") || "Foco";

  const [duracaoFocoMin, setDuracaoFocoMin] = useState(25);
  const [duracaoPausaMin, setDuracaoPausaMin] = useState(5);
  const [fase, setFase] = useState("configurar"); // configurar | focando | pausa | concluido
  const [segundosRestantes, setSegundosRestantes] = useState(25 * 60);
  const [pausado, setPausado] = useState(false);
  const [tarefaConcluida, setTarefaConcluida] = useState(false);
  const intervaloRef = useRef(null);

  useEffect(() => {
    if (fase !== "focando" && fase !== "pausa") return undefined;
    if (pausado) return undefined;

    intervaloRef.current = setInterval(() => {
      setSegundosRestantes((atual) => {
        if (atual <= 1) {
          clearInterval(intervaloRef.current);
          setFase(fase === "focando" ? "concluido" : "configurar");
          return 0;
        }
        return atual - 1;
      });
    }, 1000);

    return () => clearInterval(intervaloRef.current);
  }, [fase, pausado]);

  function iniciarFoco() {
    setSegundosRestantes(duracaoFocoMin * 60);
    setFase("focando");
    setPausado(false);
  }

  function iniciarPausa() {
    setSegundosRestantes(duracaoPausaMin * 60);
    setFase("pausa");
    setPausado(false);
  }

  function finalizarSessao() {
    clearInterval(intervaloRef.current);
    setFase("configurar");
    setPausado(false);
  }

  async function marcarTarefaConcluida() {
    if (!tarefaId || !usuario) return;
    try {
      await api.atualizarTarefa(tarefaId, usuario.id, { concluida: true });
      setTarefaConcluida(true);
    } catch {
      // silencioso: usuário pode marcar depois na tela da tarefa
    }
  }

  if (fase === "configurar") {
    return (
      <div className="container container--estreito pagina-foco">
        <div className="cartao foco-config">
          <h1>{tituloTarefa}</h1>
          <p className="foco-config__intro">
            Escolha por quanto tempo quer focar, depois clique em começar.
          </p>

          <div className="foco-config__campo">
            <span className="rotulo">Duração do foco</span>
            <div className="foco-config__opcoes">
              {DURACOES_FOCO.map((min) => (
                <button
                  key={min}
                  type="button"
                  className={
                    "foco-config__opcao" + (duracaoFocoMin === min ? " foco-config__opcao--ativa" : "")
                  }
                  onClick={() => setDuracaoFocoMin(min)}
                  aria-pressed={duracaoFocoMin === min}
                >
                  {min} min
                </button>
              ))}
            </div>
          </div>

          <div className="foco-config__campo">
            <span className="rotulo">Duração da pausa</span>
            <div className="foco-config__opcoes">
              {DURACOES_PAUSA.map((min) => (
                <button
                  key={min}
                  type="button"
                  className={
                    "foco-config__opcao" + (duracaoPausaMin === min ? " foco-config__opcao--ativa" : "")
                  }
                  onClick={() => setDuracaoPausaMin(min)}
                  aria-pressed={duracaoPausaMin === min}
                >
                  {min} min
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="botao botao--primario botao--grande botao--largo"
            onClick={iniciarFoco}
          >
            Começar foco
          </button>
        </div>
      </div>
    );
  }

  if (fase === "concluido") {
    return (
      <div className="container container--estreito pagina-foco">
        <div className="cartao foco-concluido">
          <h1>Tempo concluído</h1>
          <p>Você completou uma sessão de foco em "{tituloTarefa}".</p>

          {tarefaId && !tarefaConcluida && (
            <button type="button" className="botao botao--primario botao--largo" onClick={marcarTarefaConcluida}>
              Marcar tarefa como concluída
            </button>
          )}
          {tarefaConcluida && <p className="foco-concluido__confirmacao">Tarefa marcada como concluída ✓</p>}

          <div className="foco-concluido__acoes">
            <button type="button" className="botao botao--secundario" onClick={iniciarPausa}>
              Fazer uma pausa
            </button>
            <button type="button" className="botao botao--secundario" onClick={() => setFase("configurar")}>
              Nova sessão
            </button>
          </div>
        </div>
      </div>
    );
  }

  // fase === "focando" | "pausa"
  const emPausa = fase === "pausa";
  return (
    <div className="container container--estreito pagina-foco">
      <div className={"cartao foco-timer" + (emPausa ? " foco-timer--pausa" : "")}>
        <p className="foco-timer__rotulo">{emPausa ? "Pausa" : tituloTarefa}</p>
        <p className="foco-timer__relogio" aria-live="polite">
          {formatarTempo(segundosRestantes)}
        </p>
        <div className="foco-timer__trilha">
          <div
            className="foco-timer__preenchimento"
            style={{
              width: `${
                100 -
                (segundosRestantes / ((emPausa ? duracaoPausaMin : duracaoFocoMin) * 60)) * 100
              }%`,
            }}
          />
        </div>

        <div className="foco-timer__acoes">
          <button
            type="button"
            className="botao botao--secundario"
            onClick={() => setPausado((p) => !p)}
          >
            {pausado ? "Retomar" : "Pausar"}
          </button>
          <button type="button" className="botao botao--secundario" onClick={finalizarSessao}>
            Finalizar
          </button>
        </div>
      </div>
    </div>
  );
}
