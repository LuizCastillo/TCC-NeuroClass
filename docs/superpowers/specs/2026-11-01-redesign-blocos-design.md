# Redesign visual "Blocos" do NeuroClass

## Objetivo

Deixar o front do TCC mais bonito e marcante, com mais detalhes e efeitos, sem mudar o que
o site faz. O público é formado por estudantes, educadores e famílias, além da banca do TCC.

O sucesso é medido assim: todas as rotas usam a nova identidade, nenhum fluxo deixa de
funcionar e as regras de acessibilidade do manual continuam atendidas.

## Decisões já aprovadas

- O azul continua como cor principal.
- A direção visual é "Blocos": o conteúdo em pedaços curtos vira a identidade do site.
- Cada bloco tem uma cor própria ao ser destacado, em vez de um único amarelo.

## Fora do escopo

- Backend, banco de dados, chamadas de API e regras do quiz.
- Rotas e textos, incluindo Termos, Privacidade e os avisos de que o site não faz diagnóstico.
- Modo escuro e novas funcionalidades.

## Abordagem

Trocar a base visual em `index.css` e reescrever os arquivos CSS existentes, alterando o JSX
só onde a nova estrutura exigir. Não entra biblioteca de componentes nem Tailwind: os dois
exigiriam reescrever as telas sem benefício visível, e aumentariam o risco de quebrar fluxos.

## Identidade visual

### Cores

Os nomes `--azul-*` continuam os mesmos, porque os temas premium dependem deles.

| Variável | Valor | Uso |
| --- | --- | --- |
| `--azul-900` | `#0b2a78` | Títulos, texto forte, blocos escuros |
| `--azul-700` | `#1d4ed8` | Botões, links, blocos principais |
| `--azul-500` | `#3b82f6` | Contorno de foco |
| `--azul-100` | `#dbeafe` | Blocos claros |
| `--azul-50` | `#eff6ff` | Fundos suaves |

Cores de destaque, usadas só em blocos destacados e sempre com texto `--azul-900`:

| Variável | Valor |
| --- | --- |
| `--bloco-amarelo` | `#fbbf24` |
| `--bloco-rosa` | `#f9a8d4` |
| `--bloco-verde` | `#86efac` |
| `--bloco-lilas` | `#c4b5fd` |
| `--bloco-laranja` | `#fdba74` |
| `--bloco-agua` | `#5eead4` |
| `--bloco-coral` | `#fda4af` |
| `--bloco-lima` | `#bef264` |
| `--bloco-celeste` | `#7dd3fc` |

### Tipografia

- Títulos: Bricolage Grotesque, peso 800.
- Texto: Atkinson Hyperlegible, criada para facilitar a leitura.
- As fontes ficam no próprio projeto, via `@fontsource`, e não no Google Fonts. Assim nenhum
  dado do visitante vai para terceiros (LGPD) e as fontes carregam mesmo com internet ruim.

### Forma

Blocos e botões têm cantos retos e são separados por pequenos vãos, sem sombra suave. Campos
de formulário seguem a mesma forma.

## Efeitos

- **Blocos clicáveis:** ao passar o mouse ou focar pelo teclado, o bloco sobe, gira um pouco
  e acende na sua cor, em cerca de 200 ms.
- **Botões:** sobem 2 px e escurecem ou clareiam.
- **Blocos que levam a outra página:** a cor aparece ao passar o mouse e no foco. Como o
  clique abre outra página, ela não fica acesa depois do clique, diferente do exemplo aprovado.
- **Toque no celular:** o toque mostra a cor pelo estado ativo e segue para o destino.
- **Sem animação automática:** nada entra, pisca ou se move sozinho, conforme o manual. A
  única exceção é o Modo foco, cujos blocos se apagam devagar e indicam o tempo.
- **`prefers-reduced-motion`:** movimentos e transições são desligados; a cor continua mudando.

## Telas

| Tela | Rota | Mudança |
| --- | --- | --- |
| Início | `/` | Texto à esquerda e mosaico de 9 blocos à direita; demais seções em blocos |
| Conteúdo | `/conteudo` | Artigos como blocos grandes; progresso de leitura com 4 blocos |
| Artigo | `/conteudo/:slug` | Leitura calma, coluna estreita, blocos só nos destaques do texto |
| Quiz | `/quiz`, `/quiz/jogar`, `/quiz/resultado/:id` | Progresso com 10 blocos; alternativas em blocos; resultado em bloco grande |
| Ferramentas | `/ferramentas` | Ferramentas como blocos clicáveis |
| Planejamento | `/planejamento` e subrotas | Mesma base visual, sem mudar formulários e calendário |
| Foco | `/foco` | Grade de 20 blocos que se apagam conforme o tempo passa |
| Premium | `/premium` | Planos em blocos |
| Termos e Privacidade | `/termos`, `/privacidade` | Só tipografia e cores |
| Cabeçalho e rodapé | todas | Nova marca visual; menu utilizável no celular |

### Mosaico do Início

| Bloco | Destino | Destaque |
| --- | --- | --- |
| O que é | `/conteudo/o-que-e-tdah` | amarelo |
| Sintomas | `/conteudo/o-que-e-tdah` | rosa |
| Escola | `/conteudo/desafios-na-escola` | verde |
| Rotina | `/planejamento` | lilás |
| Quiz | `/quiz` | laranja |
| Foco | `/foco` | água |
| Mitos | `/conteudo/mitos-e-fatos` | coral |
| Fatos | `/conteudo/mitos-e-fatos` | lima |
| Apoio | `/conteudo/estrategias-de-apoio` | celeste |

### Regras do quiz

- Antes de responder, o destaque usa só amarelo, rosa e lilás, para não parecer certo ou errado.
- Depois de responder, verde indica a correta e vermelho a errada, sempre com texto
  explicativo, para que o resultado não dependa só da cor.
- As letras A, B, C e D continuam visíveis.

## O que precisa continuar funcionando

- **Temas premium:** verde, roxo e laranja continuam trocando a paleta `--azul-*`. Os blocos de
  destaque mantêm as próprias cores.
- **Exportar imagem:** o PNG/JPEG da rotina continua saindo correto com html2canvas, que tem
  suporte limitado a alguns recursos de CSS.
- **Progresso de leitura:** continua guardado como hoje.

## Acessibilidade

- Contraste AA em todo texto, incluindo cada cor de destaque.
- Foco visível em todos os elementos interativos e o mesmo destaque do mouse no teclado.
- O mosaico usa links reais, com nome acessível.
- Layout sem rolagem horizontal até 375 px de largura.

## Verificação

- `npm run lint` e `npm run build` sem erros.
- Conferência no navegador de todas as rotas, em largura de computador e de celular.
- Navegação por teclado no Início, no cadastro do quiz e no Foco.
- Telas que dependem da API testadas com o backend real, se houver credenciais do Supabase.
  Sem elas, são testadas com respostas simuladas apenas no navegador de teste, e o relatório
  final informa o que não foi testado com dados reais.
- Temas premium e exportação de imagem verificados.

## Entrega

O trabalho fica em uma branch separada, sem alterar `main` até a aprovação de vocês.
