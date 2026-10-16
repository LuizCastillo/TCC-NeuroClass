/**
 * Conteúdo educativo do NeuroClass.
 * Cada artigo cita apenas fontes reais e publicamente verificáveis: CDC,
 * DSM-5, CHADD (Children and Adults with Attention-Deficit/Hyperactivity
 * Disorder) e o estudo de Paiano et al. (2019). O banco de questões do quiz
 * deriva exclusivamente deste conteúdo.
 *
 * O texto de cada artigo é dividido em "blocos" (resumo, cartões, destaque,
 * estatística, mito/fato, lista, sanfona), pensados para leitura em pedaços
 * curtos — boa prática de acessibilidade para pessoas com TDAH (blocos
 * pequenos, títulos claros, destaques visuais, divulgação progressiva).
 * Tipos de bloco: ver components/BlocosConteudo.jsx.
 */
export const ARTIGOS = [
  {
    slug: "o-que-e-tdah",
    titulo: "O que é o TDAH?",
    resumo: "Definição, grupos de sintomas, apresentações e critérios do diagnóstico, em blocos curtos.",
    gancho: "Três apresentações, três critérios e um diagnóstico que nunca é feito sozinho.",
    cor: "azul",
    minutos: 3,
    fonte: "CDC — cdc.gov/adhd; DSM-5, American Psychiatric Association; CHADD — chadd.org",
    blocos: [
      {
        tipo: "resumo",
        itens: [
          "O TDAH é um transtorno do neurodesenvolvimento.",
          "Os sintomas se dividem em dois grupos: desatenção e hiperatividade-impulsividade.",
          "O diagnóstico é sempre clínico, feito por um profissional de saúde.",
        ],
      },
      {
        tipo: "secao",
        titulo: "A definição em uma frase",
        texto:
          "TDAH (Transtorno do Déficit de Atenção e Hiperatividade) é um transtorno do neurodesenvolvimento, " +
          "relacionado a diferenças no desenvolvimento e funcionamento do sistema nervoso central.",
      },
      {
        tipo: "secao",
        titulo: "Dois grupos de sintomas",
        texto: "Os sintomas costumam ser organizados em dois grupos principais:",
      },
      {
        tipo: "cartoes",
        itens: [
          { titulo: "Desatenção", texto: "Primeiro grupo de sintomas descrito pelo DSM-5." },
          { titulo: "Hiperatividade e impulsividade", texto: "Segundo grupo de sintomas descrito pelo DSM-5." },
        ],
      },
      {
        tipo: "secao",
        titulo: "Três apresentações possíveis",
        texto: "Combinando os dois grupos, o DSM-5 descreve três apresentações:",
      },
      {
        tipo: "cartoes",
        numerado: true,
        itens: [
          { titulo: "Predominantemente desatenta", texto: "Predominam os sintomas de desatenção." },
          { titulo: "Predominantemente hiperativa-impulsiva", texto: "Predominam os sintomas de hiperatividade e impulsividade." },
          { titulo: "Combinada", texto: "Os dois grupos de sintomas estão presentes." },
        ],
      },
      {
        tipo: "secao",
        titulo: "Os 3 critérios do diagnóstico",
        texto: "Para caracterizar o transtorno, os critérios diagnósticos consideram que os sintomas:",
      },
      {
        tipo: "cartoes",
        numerado: true,
        itens: [
          { titulo: "Antes dos 12 anos", texto: "Precisam ter aparecido antes dos 12 anos de idade." },
          { titulo: "Em mais de um ambiente", texto: "Por exemplo, em casa e na escola." },
          { titulo: "Com prejuízo real", texto: "Causam prejuízo ao funcionamento da pessoa." },
        ],
      },
      {
        tipo: "destaque",
        rotulo: "Importante",
        titulo: "Quem faz o diagnóstico?",
        texto:
          "O diagnóstico é sempre clínico, feito por um profissional de saúde qualificado, como psiquiatra, " +
          "neurologista ou psicólogo com formação apropriada — e não por ferramentas de autoavaliação.",
      },
      {
        tipo: "estatistica",
        numero: "Vida adulta",
        texto:
          "Embora seja frequentemente identificado na infância, o TDAH pode persistir ao longo da vida: segundo a " +
          "CHADD, a maioria das crianças com TDAH continua apresentando sintomas na vida adulta.",
      },
    ],
  },
  {
    slug: "desafios-na-escola",
    titulo: "Desafios comuns na escola",
    resumo: "Por que a sala de aula tradicional pode pesar e o que a pesquisa mostra sobre o apoio.",
    gancho: "Os sinais mudam conforme o contexto — e o apoio da escola inteira faz diferença.",
    cor: "roxo",
    minutos: 3,
    fonte: "PAIANO et al., Revista Educação Especial (UFSM), v. 32, 2019; DSM-5, American Psychiatric Association",
    blocos: [
      {
        tipo: "resumo",
        itens: [
          "A sala de aula tradicional exige atenção sustentada, tarefas em sequência e ficar sentado.",
          "Os sinais do TDAH variam conforme o contexto.",
          "Identificação precoce e suporte contínuo trazem benefícios reais.",
        ],
      },
      {
        tipo: "secao",
        titulo: "Onde a sala de aula tradicional pesa",
        texto:
          "A organização típica de uma sala de aula tradicional pode conflitar diretamente com as " +
          "características do TDAH, porque exige:",
      },
      {
        tipo: "cartoes",
        itens: [
          { titulo: "Atenção sustentada", texto: "Por longos períodos." },
          { titulo: "Tarefas sequenciais", texto: "Uma atividade depois da outra." },
          { titulo: "Permanência sentado", texto: "Durante boa parte da aula." },
        ],
      },
      {
        tipo: "secao",
        titulo: "Os sinais são sempre iguais?",
        texto: "Não. O DSM-5 observa que os sinais podem variar conforme o contexto. Toque para ver quando eles podem ficar mínimos ou ausentes.",
      },
      {
        tipo: "sanfona",
        titulo: "Quando os sinais podem diminuir",
        itens: [
          "Quando a pessoa recebe recompensas frequentes por comportamento apropriado",
          "Quando está sob supervisão direta",
          "Em uma situação nova",
          "Quando está envolvida em atividades de forte interesse pessoal",
        ],
      },
      {
        tipo: "destaque",
        rotulo: "O que a pesquisa mostra",
        titulo: "Cedo e continuamente",
        texto:
          "Uma revisão sistemática de programas de intervenção escolar para TDAH (Paiano et al., 2019) apontou que " +
          "a identificação precoce e a continuidade do suporte ao longo do ano letivo trazem benefícios reais " +
          "para os estudantes.",
      },
      {
        tipo: "destaque",
        rotulo: "Obstáculo comum",
        titulo: "A escola como um todo",
        texto:
          "Como grande parte dos programas depende da adesão dos próprios professores como mediadores, a falta " +
          "desse engajamento pode comprometer os resultados. Isso reforça a importância do envolvimento da " +
          "escola inteira, e não apenas de iniciativas pontuais e isoladas.",
      },
    ],
  },
  {
    slug: "estrategias-de-apoio",
    titulo: "Estratégias de apoio",
    resumo: "Acomodações de sala de aula recomendadas pela CHADD, em formato de checklist.",
    gancho: "Pequenos ajustes na rotina e no ambiente que ajudam a manter o foco.",
    cor: "verde",
    minutos: 3,
    fonte: "CHADD — chadd.org/for-educators/classroom-accommodations",
    blocos: [
      {
        tipo: "resumo",
        itens: [
          "A CHADD reúne acomodações de sala de aula recomendadas para apoiar estudantes com TDAH.",
          "Dividir tarefas, organizar o ambiente e manter rotinas claras ajudam no foco.",
          "Cada estudante é diferente, e muitos têm pontos fortes importantes.",
        ],
      },
      {
        tipo: "secao",
        titulo: "Checklist de acomodações",
        texto: "Cinco estratégias para conhecer:",
      },
      {
        tipo: "cartoes",
        numerado: true,
        colunas: 1,
        itens: [
          {
            titulo: "Dividir tarefas longas em partes menores",
            texto:
              "Permite que o estudante enxergue tanto o início quanto o fim da atividade, tornando-a menos sobrecarregante.",
          },
          {
            titulo: "Escolher bem o lugar do estudante",
            texto:
              "Perto de colegas que sirvam de modelo positivo e longe de fontes de distração, para manter o foco durante as aulas.",
          },
          {
            titulo: "Regras e rotinas bem estabelecidas",
            texto: "Salas bem geridas têm regras e rotinas conhecidas por todos os estudantes.",
          },
          {
            titulo: "Transições suaves entre atividades",
            texto: "Passar de uma atividade para outra de forma tranquila e previsível.",
          },
          {
            titulo: "Ambiente com menos elementos distrativos",
            texto: "Um ambiente físico com menos elementos visualmente distrativos.",
          },
        ],
      },
      {
        tipo: "destaque",
        rotulo: "Lembre-se",
        titulo: "Cada estudante é único",
        texto:
          "Os desafios não se manifestam da mesma forma em todos os estudantes com TDAH — e muitos deles também " +
          "apresentam pontos fortes importantes, como criatividade e grande capacidade de concentração em " +
          "atividades de forte interesse pessoal.",
      },
    ],
  },
  {
    slug: "mitos-e-fatos",
    titulo: "Mitos e fatos sobre o TDAH",
    resumo: "Toque nas afirmações e descubra o que a ciência diz, com números e fontes.",
    gancho: "Você acerta quais afirmações são mito antes de ver a resposta?",
    cor: "laranja",
    minutos: 2,
    fonte: "CHADD — chadd.org/about-adhd/myths-and-misunderstandings; DSM-5, American Psychiatric Association",
    blocos: [
      {
        tipo: "resumo",
        itens: [
          "O TDAH não é causado por falta de educação ou de limites.",
          "Há um componente genético relevante.",
          "Nem toda pessoa com TDAH é visivelmente hiperativa.",
        ],
      },
      {
        tipo: "secao",
        titulo: "Desafio: mito ou fato?",
        texto: "Leia a afirmação, pense na sua resposta e toque no cartão para conferir.",
      },
      {
        tipo: "mitofato",
        itens: [
          {
            mito: "TDAH é causado por falta de educação ou de limites impostos pelos pais.",
            fato:
              "Segundo a CHADD, estudos apontam fatores genéticos (hereditários) e neurológicos — não fatores sociais " +
              "como uma criação inadequada — como as principais causas do TDAH.",
          },
          {
            mito: "TDAH só existe em crianças com hiperatividade visível.",
            fato:
              "Como descrito pelo DSM-5, existe uma apresentação predominantemente desatenta, sem hiperatividade " +
              "evidente, além da apresentação combinada. Nem toda pessoa com TDAH é visivelmente hiperativa.",
          },
        ],
      },
      {
        tipo: "secao",
        titulo: "O peso da genética",
        texto: "De acordo com pesquisas citadas pela CHADD (Barkley, 2015):",
      },
      {
        tipo: "numeros",
        itens: [
          { numero: "57%", texto: "de chance de uma criança desenvolver TDAH se um dos pais tem o transtorno" },
          { numero: "70–80%", texto: "de chance no caso de gêmeos, se um deles tem TDAH" },
        ],
      },
      {
        tipo: "destaque",
        rotulo: "Fato",
        titulo: "Um transtorno que acompanha a pessoa",
        texto:
          "O TDAH é considerado um transtorno que acompanha a pessoa ao longo da vida (\"lifespan disorder\"). " +
          "A maioria das crianças diagnosticadas continua apresentando sintomas na vida adulta.",
      },
    ],
  },
];

export function buscarArtigoPorSlug(slug) {
  return ARTIGOS.find((a) => a.slug === slug);
}
