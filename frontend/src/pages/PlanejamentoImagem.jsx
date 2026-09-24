import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { api, ApiError } from "../services/api";
import { useUsuarioPlanejamento } from "../hooks/useUsuarioPlanejamento";
import IdentificacaoUsuario from "../components/IdentificacaoUsuario";
import "./PlanejamentoImagem.css";

const DIAS_SEMANA = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MAX_TAREFAS_VISIVEIS_POR_DIA = 3;

function mesAtualISO() {
  const hoje = new Date();
  return `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}`;
}

function nomeDoMes(ano, mes) {
  const data = new Date(ano, mes - 1, 1);
  const nome = data.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  return nome.charAt(0).toUpperCase() + nome.slice(1);
}

function gerarGradeDoMes(ano, mes) {
  const primeiroDia = new Date(ano, mes - 1, 1);
  const ultimoDia = new Date(ano, mes, 0);
  const diaSemanaInicio = primeiroDia.getDay();
  const totalDias = ultimoDia.getDate();

  const celulas = [];
  for (let i = 0; i < diaSemanaInicio; i++) celulas.push(null);
  for (let d = 1; d <= totalDias; d++) celulas.push(d);
  while (celulas.length % 7 !== 0) celulas.push(null);

  const semanas = [];
  for (let i = 0; i < celulas.length; i += 7) semanas.push(celulas.slice(i, i + 7));
  return semanas;
}

function PromoPremium() {
  return (
    <div className="container container--estreito pagina-imagem">
      <div className="cartao promo-premium">
        <span aria-hidden="true" className="promo-premium__icone">
          🔒
        </span>
        <h1>Recurso premium</h1>
        <p>Baixar sua rotina mensal como imagem (PNG ou JPEG) é um recurso exclusivo do plano premium.</p>
        <Link to="/premium" className="botao botao--primario botao--grande">
          Ver plano premium
        </Link>
      </div>
    </div>
  );
}

export default function PlanejamentoImagem() {
  const { usuario, carregandoInicial } = useUsuarioPlanejamento();
  const [mesSelecionado, setMesSelecionado] = useState(mesAtualISO());
  const [tarefas, setTarefas] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [gerandoImagem, setGerandoImagem] = useState(false);
  const [erro, setErro] = useState("");
  const gradeRef = useRef(null);

  if (carregandoInicial) return null;
  if (!usuario) return <IdentificacaoUsuario onIdentificado={() => {}} />;
  if (usuario.plano !== "premium") return <PromoPremium />;

  const [anoStr, mesStr] = mesSelecionado.split("-");
  const ano = Number(anoStr);
  const mes = Number(mesStr);

  async function gerarPreVisualizacao() {
    setCarregando(true);
    setErro("");
    try {
      const lista = await api.listarTarefasDoMes(usuario.id, ano, mes);
      setTarefas(lista);
    } catch (e) {
      setErro(e instanceof ApiError ? e.message : "Não foi possível carregar as tarefas deste mês.");
    } finally {
      setCarregando(false);
    }
  }

  async function baixarImagem(formato) {
    if (!gradeRef.current) return;
    setGerandoImagem(true);
    setErro("");
    try {
      const { default: html2canvas } = await import("html2canvas");
      const canvas = await html2canvas(gradeRef.current, {
        backgroundColor: "#ffffff",
        scale: 2,
      });
      const mimeType = formato === "jpeg" ? "image/jpeg" : "image/png";
      const extensao = formato === "jpeg" ? "jpg" : "png";
      const url = canvas.toDataURL(mimeType, 0.95);

      const link = document.createElement("a");
      link.href = url;
      link.download = `neuroclass-rotina-${mesSelecionado}.${extensao}`;
      link.click();
    } catch {
      setErro("Não foi possível gerar a imagem agora. Tente novamente.");
    } finally {
      setGerandoImagem(false);
    }
  }

  const tarefasPorDia = {};
  if (tarefas) {
    for (const tarefa of tarefas) {
      const dia = Number(tarefa.data.split("-")[2]);
      if (!tarefasPorDia[dia]) tarefasPorDia[dia] = [];
      tarefasPorDia[dia].push(tarefa);
    }
  }

  const semanas = gerarGradeDoMes(ano, mes);

  return (
    <div className="container pagina-imagem">
      <Link to="/planejamento/calendario" className="pagina-imagem__voltar">
        ← Voltar
      </Link>
      <h1>Baixar rotina como imagem</h1>
      <p className="pagina-imagem__intro">
        Escolha o mês, gere a prévia e baixe como PNG ou JPEG — útil para imprimir ou compartilhar.
      </p>

      <div className="cartao pagina-imagem__controles">
        <div>
          <label className="rotulo" htmlFor="mes-imagem">
            Mês
          </label>
          <input
            id="mes-imagem"
            className="campo"
            type="month"
            value={mesSelecionado}
            onChange={(e) => {
              setMesSelecionado(e.target.value);
              setTarefas(null);
            }}
          />
        </div>
        <button
          type="button"
          className="botao botao--primario"
          onClick={gerarPreVisualizacao}
          disabled={carregando}
        >
          {carregando ? "Carregando..." : "Gerar prévia"}
        </button>
      </div>

      {erro && (
        <p className="mensagem-erro" role="alert">
          {erro}
        </p>
      )}

      {tarefas && (
        <>
          <div className="pagina-imagem__acoes-download">
            <button
              type="button"
              className="botao botao--secundario"
              onClick={() => baixarImagem("png")}
              disabled={gerandoImagem}
            >
              {gerandoImagem ? "Gerando..." : "Baixar PNG"}
            </button>
            <button
              type="button"
              className="botao botao--secundario"
              onClick={() => baixarImagem("jpeg")}
              disabled={gerandoImagem}
            >
              {gerandoImagem ? "Gerando..." : "Baixar JPEG"}
            </button>
          </div>

          <div className="grade-calendario-wrapper">
            <div className="grade-calendario" ref={gradeRef}>
              <p className="grade-calendario__titulo">{nomeDoMes(ano, mes)}</p>
              <div className="grade-calendario__cabecalho">
                {DIAS_SEMANA.map((d) => (
                  <div key={d} className="grade-calendario__dia-semana">
                    {d}
                  </div>
                ))}
              </div>
              {semanas.map((semana, i) => (
                <div key={i} className="grade-calendario__semana">
                  {semana.map((dia, j) => (
                    <div
                      key={j}
                      className={"grade-calendario__dia" + (dia === null ? " grade-calendario__dia--vazio" : "")}
                    >
                      {dia !== null && (
                        <>
                          <span className="grade-calendario__numero">{dia}</span>
                          <div className="grade-calendario__tarefas">
                            {(tarefasPorDia[dia] || [])
                              .slice(0, MAX_TAREFAS_VISIVEIS_POR_DIA)
                              .map((t) => (
                                <span
                                  key={t.id}
                                  className={
                                    "grade-calendario__tarefa" +
                                    (t.concluida ? " grade-calendario__tarefa--concluida" : "")
                                  }
                                  title={t.titulo}
                                >
                                  {t.horario ? `${t.horario.slice(0, 5)} ` : ""}
                                  {t.titulo}
                                </span>
                              ))}
                            {(tarefasPorDia[dia] || []).length > MAX_TAREFAS_VISIVEIS_POR_DIA && (
                              <span className="grade-calendario__mais">
                                +{(tarefasPorDia[dia] || []).length - MAX_TAREFAS_VISIVEIS_POR_DIA} mais
                              </span>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
