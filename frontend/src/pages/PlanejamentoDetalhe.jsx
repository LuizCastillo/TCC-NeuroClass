import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api, ApiError } from "../services/api";
import { useUsuarioPlanejamento } from "../hooks/useUsuarioPlanejamento";
import IdentificacaoUsuario from "../components/IdentificacaoUsuario";
import "./PlanejamentoDetalhe.css";

const PRIORIDADE_ROTULO = { baixa: "Baixa", media: "Média", alta: "Alta" };
const CATEGORIA_ROTULO = {
  estudos: "Estudos",
  trabalhos: "Trabalhos",
  escola: "Escola",
  leitura: "Leitura",
  projetos: "Projetos",
  outros: "Outros",
};

export default function PlanejamentoDetalhe() {
  const { id } = useParams();
  const { usuario, carregandoInicial } = useUsuarioPlanejamento();
  const navigate = useNavigate();

  const [tarefa, setTarefa] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [novaSubtarefa, setNovaSubtarefa] = useState("");
  const [adicionando, setAdicionando] = useState(false);
  const [excluindo, setExcluindo] = useState(false);

  const carregarTarefa = useCallback(async () => {
    if (!usuario) return;
    setCarregando(true);
    setErro("");
    try {
      const dados = await api.obterTarefa(id, usuario.id);
      setTarefa(dados);
    } catch (e) {
      setErro(e instanceof ApiError ? e.message : "Não foi possível carregar esta tarefa.");
    } finally {
      setCarregando(false);
    }
  }, [id, usuario]);

  useEffect(() => {
    carregarTarefa();
  }, [carregarTarefa]);

  if (carregandoInicial) return null;
  if (!usuario) return <IdentificacaoUsuario onIdentificado={() => {}} />;

  async function alternarConcluidaTarefa() {
    const novoStatus = !tarefa.concluida;
    setTarefa((t) => ({ ...t, concluida: novoStatus }));
    try {
      await api.atualizarTarefa(tarefa.id, usuario.id, { concluida: novoStatus });
    } catch {
      setTarefa((t) => ({ ...t, concluida: !novoStatus }));
    }
  }

  async function adicionarSubtarefa(evento) {
    evento.preventDefault();
    if (!novaSubtarefa.trim()) return;
    setAdicionando(true);
    try {
      const criada = await api.criarSubtarefa(tarefa.id, usuario.id, novaSubtarefa.trim());
      setTarefa((t) => ({ ...t, subtarefas: [...t.subtarefas, criada] }));
      setNovaSubtarefa("");
    } catch (e) {
      setErro(e instanceof ApiError ? e.message : "Não foi possível adicionar a etapa.");
    } finally {
      setAdicionando(false);
    }
  }

  async function alternarSubtarefa(subtarefa) {
    const novoStatus = !subtarefa.concluida;
    setTarefa((t) => ({
      ...t,
      subtarefas: t.subtarefas.map((s) => (s.id === subtarefa.id ? { ...s, concluida: novoStatus } : s)),
    }));
    try {
      await api.atualizarSubtarefa(subtarefa.id, usuario.id, { concluida: novoStatus });
    } catch {
      setTarefa((t) => ({
        ...t,
        subtarefas: t.subtarefas.map((s) =>
          s.id === subtarefa.id ? { ...s, concluida: !novoStatus } : s
        ),
      }));
    }
  }

  async function excluirSubtarefa(subtarefa) {
    setTarefa((t) => ({ ...t, subtarefas: t.subtarefas.filter((s) => s.id !== subtarefa.id) }));
    try {
      await api.excluirSubtarefa(subtarefa.id, usuario.id);
    } catch {
      carregarTarefa();
    }
  }

  async function excluirTarefa() {
    setExcluindo(true);
    try {
      await api.excluirTarefa(tarefa.id, usuario.id);
      navigate("/planejamento");
    } catch (e) {
      setErro(e instanceof ApiError ? e.message : "Não foi possível excluir a tarefa.");
      setExcluindo(false);
    }
  }

  if (carregando) {
    return (
      <div className="container container--estreito pagina-planejamento-detalhe">
        <p>Carregando...</p>
      </div>
    );
  }

  if (erro && !tarefa) {
    return (
      <div className="container container--estreito pagina-planejamento-detalhe">
        <p className="mensagem-erro" role="alert">
          {erro}
        </p>
        <Link to="/planejamento" className="botao botao--primario">
          Voltar
        </Link>
      </div>
    );
  }

  if (!tarefa) return null;

  const totalSubtarefas = tarefa.subtarefas.length;
  const subtarefasConcluidas = tarefa.subtarefas.filter((s) => s.concluida).length;

  return (
    <div className="container container--estreito pagina-planejamento-detalhe">
      <Link to="/planejamento" className="pagina-planejamento-detalhe__voltar">
        ← Voltar
      </Link>

      <div className="cartao detalhe-tarefa">
        <div className="detalhe-tarefa__cabecalho">
          <button
            type="button"
            className="detalhe-tarefa__checkbox"
            onClick={alternarConcluidaTarefa}
            aria-pressed={tarefa.concluida}
          >
            {tarefa.concluida ? "✓" : ""}
          </button>
          <h1 className={tarefa.concluida ? "detalhe-tarefa__titulo--concluida" : ""}>
            {tarefa.titulo}
          </h1>
        </div>

        {tarefa.descricao && <p className="detalhe-tarefa__descricao">{tarefa.descricao}</p>}

        <div className="detalhe-tarefa__tags">
          <span className="rotulo-tag">{CATEGORIA_ROTULO[tarefa.categoria]}</span>
          <span className="rotulo-tag">Prioridade {PRIORIDADE_ROTULO[tarefa.prioridade]}</span>
          {tarefa.horario && <span className="rotulo-tag">{tarefa.horario.slice(0, 5)}</span>}
          {tarefa.duracao_minutos && <span className="rotulo-tag">{tarefa.duracao_minutos} min</span>}
        </div>

        {tarefa.horario && (
          <Link
            to={`/foco?tarefa=${tarefa.id}&titulo=${encodeURIComponent(tarefa.titulo)}`}
            className="botao botao--secundario detalhe-tarefa__botao-foco"
          >
            Começar foco nesta tarefa
          </Link>
        )}
      </div>

      <div className="cartao detalhe-subtarefas">
        <h2>
          Etapas
          {totalSubtarefas > 0 && (
            <span className="detalhe-subtarefas__contagem">
              {subtarefasConcluidas} de {totalSubtarefas}
            </span>
          )}
        </h2>
        <p className="detalhe-subtarefas__ajuda">
          Divida esta tarefa em passos menores para torná-la mais concreta.
        </p>

        {totalSubtarefas > 0 && (
          <ul className="lista-subtarefas">
            {tarefa.subtarefas.map((subtarefa) => (
              <li key={subtarefa.id} className="subtarefa-item">
                <button
                  type="button"
                  className="subtarefa-item__checkbox"
                  onClick={() => alternarSubtarefa(subtarefa)}
                  aria-pressed={subtarefa.concluida}
                  aria-label={subtarefa.concluida ? "Marcar como não concluída" : "Marcar como concluída"}
                >
                  {subtarefa.concluida ? "✓" : ""}
                </button>
                <span
                  className={
                    "subtarefa-item__titulo" +
                    (subtarefa.concluida ? " subtarefa-item__titulo--concluida" : "")
                  }
                >
                  {subtarefa.titulo}
                </span>
                <button
                  type="button"
                  className="subtarefa-item__excluir"
                  onClick={() => excluirSubtarefa(subtarefa)}
                  aria-label={`Excluir etapa ${subtarefa.titulo}`}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}

        <form className="form-nova-subtarefa" onSubmit={adicionarSubtarefa}>
          <label htmlFor="nova-subtarefa" className="sr-only">
            Nova etapa
          </label>
          <input
            id="nova-subtarefa"
            className="campo"
            type="text"
            placeholder="Ex: Pesquisar o tema"
            value={novaSubtarefa}
            onChange={(e) => setNovaSubtarefa(e.target.value)}
          />
          <button type="submit" className="botao botao--secundario" disabled={adicionando}>
            Adicionar
          </button>
        </form>
      </div>

      {erro && (
        <p className="mensagem-erro" role="alert">
          {erro}
        </p>
      )}

      <button
        type="button"
        className="botao-excluir-tarefa"
        onClick={excluirTarefa}
        disabled={excluindo}
      >
        {excluindo ? "Excluindo..." : "Excluir tarefa"}
      </button>
    </div>
  );
}
