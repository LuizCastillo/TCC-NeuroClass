# Redesign Blocos Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Aplicar a identidade visual "Blocos" a todas as rotas do front, sem mudar o que o site faz.

**Architecture:** A base visual fica em `frontend/src/index.css` (variáveis e classes globais). Cada tela mantém seu CSS atual, reescrito sobre essa base. O JSX muda só onde a estrutura exige; lógica de estado e chamadas de API não mudam.

**Tech Stack:** React 19, Vite 8, React Router 7, CSS puro, `@fontsource`, `node:test`.

**Spec:** `docs/superpowers/specs/2026-11-01-redesign-blocos-design.md`

## Global Constraints

- Todo o trabalho fica na branch `redesign/blocos`; nada vai para `main` nem é enviado ao GitHub sem aprovação.
- Não alterar `backend/`, `database/`, `frontend/src/services/api.js`, rotas nem textos.
- Manter os nomes `--azul-*`, porque os temas premium dependem deles.
- Cores de destaque sempre com texto `--azul-900`.
- Sem animação automática, exceto o apagar dos blocos no Modo foco.
- Com `prefers-reduced-motion: reduce`, sem movimento nem transição; a cor continua mudando.
- Todo destaque de mouse também vale para `:focus-visible`.
- Contraste AA e nenhuma rolagem horizontal até 375 px.
- Sem novas dependências além das duas fontes.

## Review Focus

- Palavras longas em blocos pequenos, a 375 px (ex.: "neurodesenvolvimento"): o texto quebra dentro do bloco, sem vazar. Verificado nas Tasks 2 e 4.
- Temas verde, roxo e laranja: botões e blocos seguem legíveis. O branco sobre `#ea580c` já fica abaixo de AA hoje; ajustar o valor do tema laranja. Verificado na Task 1.
- Exportar imagem da rotina: o html2canvas pode ignorar fontes ou transformações; o arquivo deve sair completo e sem corte. Verificado na Task 6.
- Erros e carregamento da API: mensagens continuam visíveis e legíveis no novo visual. Verificado nas Tasks 4 e 6.
- Progresso de leitura em 0, parcial e 4 de 4: blocos acesos correspondem ao número. Verificado na Task 3.

---

### Task 1: Base visual, cabeçalho e rodapé

**Files:**
- Modify: `frontend/package.json`, `frontend/package-lock.json`, `frontend/src/main.jsx`, `frontend/src/index.css`, `frontend/src/components/Header.css`, `frontend/src/components/Footer.css`, `frontend/.gitignore` se necessário
- Create: `frontend/tests/contraste.test.js`

**Interfaces:**
- Produces: variáveis `--azul-*`, `--bloco-*` e `--fonte-titulo`; classes `.bloco` (destaque por `--cor`) e `.bloco--azul`, `.bloco--escuro`, `.bloco--claro`.

- [ ] **Step 1:** Criar a branch `redesign/blocos` a partir de `main` e commitar a especificação e este plano.
- [ ] **Step 2:** Escrever `contraste.test.js`, com `node:test`, lendo os valores de `index.css`. Asserts: razão ≥ 4,5 para `--azul-900` sobre cada `--bloco-*`; para branco sobre `--azul-700` em cada tema; e para `--azul-900` sobre `--azul-100`. Adicionar o script `"test": "node --test tests/"`.
- [ ] **Step 3:** Rodar `npm test` em `frontend/`. Esperado: FALHA, pois as variáveis `--bloco-*` ainda não existem.
- [ ] **Step 4:** Instalar `@fontsource-variable/bricolage-grotesque` e `@fontsource/atkinson-hyperlegible` (pesos 400 e 700) e importar em `main.jsx`.
- [ ] **Step 5:** Reescrever `index.css` com os valores da especificação, cantos retos, botões, campos, `.bloco` e o bloco de `prefers-reduced-motion`. Escurecer o `--azul-700` do tema laranja até passar no teste.
- [ ] **Step 6:** Rodar `npm test`. Esperado: PASS.
- [ ] **Step 7:** Reescrever `Header.css` e `Footer.css`. No celular, os links quebram em linhas, sem menu oculto e sem mudar o JSX.
- [ ] **Step 8:** Rodar `npm run lint && npm run build`. Esperado: sem erros. Conferir a 1280 e a 375 px.
- [ ] **Step 9:** Commitar: `feat(visual): adiciona base da identidade Blocos`.

### Task 2: Início

**Files:**
- Create: `frontend/src/data/mosaico.js`, `frontend/tests/mosaico.test.js`
- Modify: `frontend/src/pages/Home.jsx`, `frontend/src/pages/Home.css`

**Interfaces:**
- Consumes: `.bloco` e `--bloco-*` da Task 1; `ARTIGOS` de `data/conteudo.js`.
- Produces: `MOSAICO: Array<{ rotulo: string, para: string, cor: string }>`, com os 9 itens da tabela da especificação.

- [ ] **Step 1:** Escrever `mosaico.test.js`. Asserts: 9 itens; 9 cores diferentes; todo `para` em `/conteudo/` corresponde a um `slug` de `ARTIGOS`.
- [ ] **Step 2:** Rodar `npm test`. Esperado: FALHA, pois o módulo não existe.
- [ ] **Step 3:** Criar `mosaico.js` com os valores da tabela.
- [ ] **Step 4:** Rodar `npm test`. Esperado: PASS.
- [ ] **Step 5:** Refazer o hero de `Home.jsx`: texto à esquerda e mosaico de `<Link>` à direita, com o `--cor` definido no `style` de cada item. Manter os textos e o aviso.
- [ ] **Step 6:** Conferir a 1280 e a 375 px: destaque com mouse e teclado, cada link abre o destino, e o texto não vaza dos blocos.
- [ ] **Step 7:** Commitar: `feat(home): adiciona mosaico de blocos`.

### Task 3: Conteúdo e artigo

**Files:**
- Modify: `frontend/src/pages/Conteudo.jsx`, `frontend/src/pages/Conteudo.css`, `frontend/src/pages/ConteudoDetalhe.jsx`, `frontend/src/components/BlocosConteudo.jsx`

**Interfaces:**
- Consumes: `.bloco`, `--bloco-*`; `lerLidos()` de `data/leitura.js`.

- [ ] **Step 1:** Em `Conteudo.jsx`, trocar a barra de progresso por 4 blocos, com `aria-label` igual ao atual, e os artigos por blocos grandes com cor própria.
- [ ] **Step 2:** Reescrever `Conteudo.css`, mantendo a leitura calma: coluna estreita e blocos só nos destaques. Não mudar o texto de `conteudo.js`.
- [ ] **Step 3:** Conferir os 4 artigos e todos os tipos de bloco (resumo, cartões, destaque, estatística, mito/fato, lista, sanfona). Definir `localStorage` para 0, 2 e 4 lidos; os blocos acesos devem bater com o número.
- [ ] **Step 4:** Rodar `npm run lint && npm run build`. Esperado: sem erros.
- [ ] **Step 5:** Commitar: `feat(conteudo): aplica identidade Blocos`.

### Task 4: Quiz

**Files:**
- Modify: `frontend/src/pages/Quiz.css`, `frontend/src/pages/QuizCadastro.jsx`, `frontend/src/pages/QuizJogar.jsx`, `frontend/src/pages/QuizResultado.jsx`, `frontend/src/components/BarraProgresso.jsx`, `frontend/src/components/BarraProgresso.css`, `frontend/src/components/AlternativaBotao.css`, `frontend/src/components/IdentificacaoUsuario.css`

**Interfaces:**
- Consumes: `.bloco`, `--bloco-amarelo`, `--bloco-rosa`, `--bloco-lilas`.

- [ ] **Step 1:** Criar um servidor simulado em Node no scratchpad, fora do repositório, respondendo às rotas de quiz de `services/api.js` na porta 8000.
- [ ] **Step 2:** Mudar `BarraProgresso` para `total` blocos, mantendo as props `atual` e `total` e o texto acessível.
- [ ] **Step 3:** Reescrever os CSS. Antes de responder, destaque amarelo, rosa e lilás; depois, verde para a correta e vermelho para a errada, com o texto de retorno.
- [ ] **Step 4:** Jogar um quiz com o servidor simulado: acerto, erro, erro de API e resultado final. Conferir a 375 px com "Transtorno do neurodesenvolvimento".
- [ ] **Step 5:** Rodar `npm run lint && npm run build`. Esperado: sem erros.
- [ ] **Step 6:** Commitar: `feat(quiz): aplica identidade Blocos`.

### Task 5: Ferramentas e Foco

**Files:**
- Create: `frontend/src/data/focoBlocos.js`, `frontend/tests/focoBlocos.test.js`
- Modify: `frontend/src/pages/Ferramentas.jsx`, `frontend/src/pages/Ferramentas.css`, `frontend/src/pages/Foco.jsx`, `frontend/src/pages/Foco.css`

**Interfaces:**
- Produces: `blocosApagados(restante: number, total: number): number`, inteiro de 0 a 20.

- [ ] **Step 1:** Escrever o teste. Asserts: `(1500, 1500) → 0`; `(1125, 1500) → 5`; `(0, 1500) → 20`; `(100, 0) → 0`.
- [ ] **Step 2:** Rodar `npm test`. Esperado: FALHA, pois o módulo não existe.
- [ ] **Step 3:** Implementar arredondando para baixo: `(1 - restante / total) * 20`.
- [ ] **Step 4:** Rodar `npm test`. Esperado: PASS.
- [ ] **Step 5:** Adicionar a grade de 20 blocos em `Foco.jsx` com `aria-hidden`, sem mudar o temporizador, e reescrever os CSS.
- [ ] **Step 6:** Conferir foco, pausa e fim do temporizador, e os links de Ferramentas.
- [ ] **Step 7:** Commitar: `feat(foco): adiciona grade de blocos do tempo`.

### Task 6: Planejamento

**Files:**
- Modify: `frontend/src/pages/Planejamento.css`, `frontend/src/pages/PlanejamentoNova.css`, `frontend/src/pages/PlanejamentoDetalhe.css`, `frontend/src/pages/PlanejamentoCalendario.css`, `frontend/src/pages/PlanejamentoImagem.css`, `frontend/src/components/TarefaItem.css`

- [ ] **Step 1:** Ampliar o servidor simulado com as rotas de planejamento e assinatura de `services/api.js`.
- [ ] **Step 2:** Reescrever os CSS, sem mudar o JSX. Revisar as cores fixas do calendário e da imagem.
- [ ] **Step 3:** Conferir as 4 subrotas, os 4 temas e os estados vazio, de erro e de carregamento.
- [ ] **Step 4:** Exportar PNG e JPEG da rotina e abrir os arquivos. Esperado: grade completa, sem corte e com texto legível.
- [ ] **Step 5:** Rodar `npm run lint && npm run build`. Esperado: sem erros.
- [ ] **Step 6:** Commitar: `feat(planejamento): aplica identidade Blocos`.

### Task 7: Premium, Termos e Privacidade

**Files:**
- Modify: `frontend/src/pages/Premium.css`, `frontend/src/pages/Premium.jsx` se a estrutura exigir, `frontend/src/index.css` se Termos e Privacidade precisarem de classes de texto

- [ ] **Step 1:** Reescrever `Premium.css` com planos em blocos. Em Termos e Privacidade, mudar só tipografia e cores.
- [ ] **Step 2:** Conferir as 3 páginas a 1280 e a 375 px e confirmar que nenhum texto mudou com `git diff`.
- [ ] **Step 3:** Commitar: `feat(premium): aplica identidade Blocos`.

### Task 8: Verificação final

**Files:**
- Modify: `README.md` apenas para citar `npm test`

- [ ] **Step 1:** Rodar `npm test && npm run lint && npm run build` em `frontend/`. Esperado: todos sem erros.
- [ ] **Step 2:** Percorrer as 16 rotas a 1280 e a 375 px. Esperado: sem erros no console e sem rolagem horizontal.
- [ ] **Step 3:** Navegar só pelo teclado no Início, no cadastro do quiz e no Foco, e testar com `prefers-reduced-motion` ativo.
- [ ] **Step 4:** Confirmar com `git diff main --stat` que `backend/`, `database/` e `services/api.js` não mudaram.
- [ ] **Step 5:** Commitar e relatar o que foi testado com dados simulados e o que depende do backend real.
