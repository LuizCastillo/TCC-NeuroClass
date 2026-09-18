import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { api, ApiError } from "../services/api";
import { useUsuarioPlanejamento } from "../hooks/useUsuarioPlanejamento";
import IdentificacaoUsuario from "../components/IdentificacaoUsuario";
import "./PlanejamentoNova.css";

const CATEGORIAS = [
  { valor: "estudos", rotulo: "Estudos", icone: "📚" },
  { valor: "trabalhos", rotulo: "Trabalhos", icone: "📝" },
  { valor: "escola", rotulo: "Escola", icone: "🏫" },
  { valor: "leitura", rotulo: "Leitura", icone: "📖" },
  { valor: "projetos", rotulo: "Projetos", icone: "💻" },
  { valor: "outros", rotulo: "Outros", icone: "📌" },
];

const PRIORIDADES = [
  { valor: "baixa", rotulo: "Baixa" },
  { valor: "media", rotulo: "Média" },
  { valor: "alta", rotulo: "Alta" },
];

const TOTAL_ETAPAS = 3;

export default function PlanejamentoNova() {
  const { usuario, carregandoInicial } = useUsuarioPlanejamento();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dataInicial = searchParams.get("data") || "";

  const [etapa, setEtapa] = useState(1);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState(dataInicial);
  const [horario, setHorario] = useState("");
  const [duracaoMinutos, setDuracaoMinutos] = useState("");
  const [prioridade, setPrioridade] = useState("media");
  const [categoria, setCategoria] = useState("outros");
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");

  if (carregandoInicial) return null;
  if (!usuario) return <IdentificacaoUsuario onIdentificado={() => {}} />;

  function avancar() {
    if (etapa === 1 && (!titulo.trim() || !data)) {
      setErro("Preencha ao menos o nome e a data da tarefa.");
      return;
    }
    setErro("");
    setEtapa((e) => Math.min(e + 1, TOTAL_ETAPAS));
  }

  function voltar() {
    setErro("");
    setEtapa((e) => Math.max(e - 1, 1));
  }

  async function salvar() {
    setEnviando(true);
    setErro("");
    try {
      const tarefa = await api.criarTarefa({
        usuario_id: usuario.id,
        titulo: titulo.trim(),
        descricao: descricao.trim() || null,
        data,
        horario: horario || null,
        duracao_minutos: duracaoMinutos ? Number(duracaoMinutos) : null,
        prioridade,
        categoria,
      });
      navigate(`/planejamento/${tarefa.id}`);
    } catch (e) {
      setErro(
        e instanceof ApiError ? e.message : "Não foi possível salvar a tarefa. Tente novamente."
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="container container--estreito pagina-planejamento-nova">
      <Link to="/planejamento" className="pagina-planejamento-nova__voltar">
        ← Voltar
      </Link>
      <h1>Nova tarefa</h1>

      <div className="cartao formulario-etapas">
        <p className="formulario-etapas__progresso">
          Etapa {etapa} de {TOTAL_ETAPAS}
        </p>

        {etapa === 1 && (
          <div className="formulario-etapas__campos">
            <div>
              <label className="rotulo" htmlFor="titulo">
                O que você precisa fazer?
              </label>
              <input
                id="titulo"
                className="campo"
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ex: Fazer trabalho de História"
                autoFocus
              />
            </div>
            <div>
              <label className="rotulo" htmlFor="data">
                Data
              </label>
              <input
                id="data"
                className="campo"
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
            </div>
          </div>
        )}

        {etapa === 2 && (
          <div className="formulario-etapas__campos">
            <div>
              <label className="rotulo" htmlFor="horario">
                Horário (opcional)
              </label>
              <input
                id="horario"
                className="campo"
                type="time"
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
              />
            </div>
            <div>
              <label className="rotulo" htmlFor="duracao">
                Duração estimada em minutos (opcional)
              </label>
              <input
                id="duracao"
                className="campo"
                type="number"
                min="1"
                max="1440"
                value={duracaoMinutos}
                onChange={(e) => setDuracaoMinutos(e.target.value)}
                placeholder="Ex: 30"
              />
            </div>
            <div>
              <label className="rotulo" htmlFor="descricao">
                Descrição (opcional)
              </label>
              <textarea
                id="descricao"
                className="campo formulario-etapas__textarea"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                rows={3}
              />
            </div>
          </div>
        )}

        {etapa === 3 && (
          <div className="formulario-etapas__campos">
            <fieldset>
              <legend className="rotulo">Categoria</legend>
              <div className="opcoes-categoria">
                {CATEGORIAS.map((c) => (
                  <button
                    key={c.valor}
                    type="button"
                    className={
                      "opcao-categoria" + (categoria === c.valor ? " opcao-categoria--selecionada" : "")
                    }
                    onClick={() => setCategoria(c.valor)}
                    aria-pressed={categoria === c.valor}
                  >
                    <span aria-hidden="true">{c.icone}</span>
                    {c.rotulo}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="rotulo">Prioridade</legend>
              <div className="opcoes-prioridade">
                {PRIORIDADES.map((p) => (
                  <button
                    key={p.valor}
                    type="button"
                    className={
                      "opcao-prioridade" +
                      (prioridade === p.valor ? " opcao-prioridade--selecionada" : "")
                    }
                    onClick={() => setPrioridade(p.valor)}
                    aria-pressed={prioridade === p.valor}
                  >
                    {p.rotulo}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
        )}

        {erro && (
          <p className="mensagem-erro" role="alert">
            {erro}
          </p>
        )}

        <div className="formulario-etapas__acoes">
          {etapa > 1 && (
            <button type="button" className="botao botao--secundario" onClick={voltar}>
              Voltar
            </button>
          )}
          {etapa < TOTAL_ETAPAS ? (
            <button type="button" className="botao botao--primario" onClick={avancar}>
              Continuar
            </button>
          ) : (
            <button
              type="button"
              className="botao botao--primario"
              onClick={salvar}
              disabled={enviando}
            >
              {enviando ? "Salvando..." : "Salvar tarefa"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
