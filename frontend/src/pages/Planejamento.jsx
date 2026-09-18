import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, ApiError } from "../services/api";
import { useUsuarioPlanejamento } from "../hooks/useUsuarioPlanejamento";
import IdentificacaoUsuario from "../components/IdentificacaoUsuario";
import TarefaItem from "../components/TarefaItem";
import "./Planejamento.css";

function dataDeHoje() {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}

function formatarDataExtenso(dataISO) {
  const [ano, mes, dia] = dataISO.split("-").map(Number);
  const data = new Date(ano, mes - 1, dia);
  return data.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" });
}

function somarDias(dataISO, quantidade) {
  const [ano, mes, dia] = dataISO.split("-").map(Number);
  const data = new Date(ano, mes - 1, dia);
  data.setDate(data.getDate() + quantidade);
  const anoNovo = data.getFullYear();
  const mesNovo = String(data.getMonth() + 1).padStart(2, "0");
  const diaNovo = String(data.getDate()).padStart(2, "0");
  return `${anoNovo}-${mesNovo}-${diaNovo}`;
}

export default function Planejamento() {
  const { usuario, carregandoInicial } = useUsuarioPlanejamento();
  const navigate = useNavigate();
  const [dataSelecionada, setDataSelecionada] = useState(dataDeHoje());
  const [tarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const carregarTarefas = useCallback(
    async (usuarioAtual, data) => {
      setCarregando(true);
      setErro("");
      try {
        const lista = await api.listarTarefas(usuarioAtual.id, data);
        setTarefas(lista);
      } catch (e) {
        setErro(
          e instanceof ApiError ? e.message : "Não foi possível carregar suas tarefas agora."
        );
      } finally {
        setCarregando(false);
      }
    },
    []
  );

  useEffect(() => {
    if (usuario) {
      carregarTarefas(usuario, dataSelecionada);
    }
  }, [usuario, dataSelecionada, carregarTarefas]);

  async function alternarConcluida(tarefa) {
    // atualização otimista: reflete na tela antes da resposta do backend
    setTarefas((atuais) =>
      atuais.map((t) => (t.id === tarefa.id ? { ...t, concluida: !t.concluida } : t))
    );
    try {
      await api.atualizarTarefa(tarefa.id, usuario.id, { concluida: !tarefa.concluida });
    } catch {
      // reverte se der erro
      setTarefas((atuais) =>
        atuais.map((t) => (t.id === tarefa.id ? { ...t, concluida: tarefa.concluida } : t))
      );
    }
  }

  if (carregandoInicial) return null;

  if (!usuario) {
    return <IdentificacaoUsuario onIdentificado={() => {}} />;
  }

  const concluidas = tarefas.filter((t) => t.concluida).length;
  const total = tarefas.length;
  const percentual = total > 0 ? Math.round((concluidas / total) * 100) : 0;
  const ehHoje = dataSelecionada === dataDeHoje();

  return (
    <div className="container container--estreito pagina-planejamento">
      <header className="planejamento-cabecalho">
        <p className="planejamento-cabecalho__saudacao">Olá, {usuario.nome.split(" ")[0]}!</p>
        <div className="planejamento-navegacao-data">
          <button
            type="button"
            className="planejamento-navegacao-data__seta"
            onClick={() => setDataSelecionada((d) => somarDias(d, -1))}
            aria-label="Dia anterior"
          >
            ←
          </button>
          <h1 className="planejamento-navegacao-data__texto">
            {ehHoje ? "Hoje" : formatarDataExtenso(dataSelecionada)}
          </h1>
          <button
            type="button"
            className="planejamento-navegacao-data__seta"
            onClick={() => setDataSelecionada((d) => somarDias(d, 1))}
            aria-label="Próximo dia"
          >
            →
          </button>
        </div>
      </header>

      {total > 0 && (
        <div className="planejamento-progresso">
          <div className="planejamento-progresso__trilha">
            <div className="planejamento-progresso__preenchimento" style={{ width: `${percentual}%` }} />
          </div>
          <span className="planejamento-progresso__texto">
            {concluidas} de {total} tarefas concluídas
          </span>
        </div>
      )}

      {erro && (
        <p className="mensagem-erro" role="alert">
          {erro}
        </p>
      )}

      {carregando ? (
        <p className="planejamento-carregando">Carregando...</p>
      ) : tarefas.length === 0 ? (
        <div className="cartao planejamento-vazio">
          <p>Nenhuma tarefa para {ehHoje ? "hoje" : "este dia"} ainda.</p>
        </div>
      ) : (
        <ul className="planejamento-lista">
          {tarefas.map((tarefa) => (
            <TarefaItem
              key={tarefa.id}
              tarefa={tarefa}
              onAlternarConcluida={alternarConcluida}
              onAbrir={(t) => navigate(`/planejamento/${t.id}`)}
            />
          ))}
        </ul>
      )}

      <Link
        to={`/planejamento/nova?data=${dataSelecionada}`}
        className="botao botao--primario botao--grande botao--largo planejamento-botao-adicionar"
      >
        + Adicionar tarefa
      </Link>
    </div>
  );
}
