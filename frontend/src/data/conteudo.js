/**
 * Conteúdo educativo do NeuroClass (Manual, Parte II).
 * Cada artigo cita sua fonte científica, conforme RN08.
 * Em uma evolução futura, este conteúdo pode migrar para uma tabela no
 * banco de dados; por ora, é servido estaticamente pelo frontend, já que o
 * fluxo de validação de conteúdo (capítulo 16) é feito manualmente pela
 * equipe antes da publicação.
 */
export const ARTIGOS = [
  {
    slug: "o-que-e-tdah",
    titulo: "O que é o TDAH?",
    resumo: "Entenda a definição, os grupos de sintomas e os critérios diagnósticos do TDAH.",
    fonte: "CDC — cdc.gov/adhd; DSM-5, American Psychiatric Association",
    corpo: [
      "O TDAH (Transtorno do Déficit de Atenção e Hiperatividade) é um transtorno do neurodesenvolvimento, " +
        "relacionado a diferenças no desenvolvimento e funcionamento do sistema nervoso central.",
      "Os sintomas costumam ser organizados em dois grupos principais: desatenção e hiperatividade-impulsividade. " +
        "Uma pessoa pode apresentar predominância de um dos grupos, ou uma combinação dos dois.",
      "Para caracterizar o transtorno, os critérios diagnósticos consideram que os sintomas precisam ter " +
        "aparecido antes dos 12 anos de idade e ocorrer em mais de um ambiente — por exemplo, em casa e na " +
        "escola — causando prejuízo real ao funcionamento da pessoa.",
      "É importante destacar que o diagnóstico do TDAH é sempre clínico, feito por um profissional de saúde " +
        "qualificado, como psiquiatra, neurologista ou psicólogo com formação apropriada. Nenhuma ferramenta de " +
        "autoavaliação, incluindo quizzes como o deste site, substitui essa avaliação profissional.",
    ],
  },
  {
    slug: "desafios-na-escola",
    titulo: "Desafios comuns na escola",
    resumo: "Como a estrutura tradicional da sala de aula pode ser desafiadora para estudantes com TDAH.",
    fonte: "Manual Técnico NeuroClass, Parte II, capítulos 11-12; PAIANO et al., Revista Educação Especial, 2019",
    corpo: [
      "A organização típica de uma sala de aula tradicional — que exige atenção sustentada por longos " +
        "períodos, tarefas sequenciais e permanência sentado — pode conflitar diretamente com as " +
        "características do TDAH.",
      "Entre os desafios mais relatados na literatura estão dificuldades de organização e planejamento de " +
        "tarefas e prazos (funções executivas), mesmo quando o estudante compreende bem o conteúdo das matérias.",
      "Estudantes com TDAH também podem estar mais vulneráveis a rótulos negativos por parte de colegas e " +
        "educadores com pouco conhecimento sobre o transtorno — um fenômeno que pode ser combatido com mais " +
        "conscientização sobre o tema.",
      "Por outro lado, pesquisas sugerem que programas de intervenção baseados na escola trazem benefício " +
        "quando há identificação precoce e continuidade do suporte ao longo do ano letivo — não apenas em " +
        "períodos curtos e isolados.",
    ],
  },
  {
    slug: "estrategias-de-apoio",
    titulo: "Estratégias de apoio",
    resumo: "Abordagens pedagógicas que podem ajudar estudantes com TDAH a lidar com os desafios do dia a dia.",
    fonte: "Manual Técnico NeuroClass, Parte II, capítulo 13",
    corpo: [
      "Diversas estratégias pedagógicas podem apoiar estudantes com TDAH na organização e na manutenção da " +
        "atenção ao longo das atividades escolares.",
      "Uma das estratégias recomendadas é a divisão de tarefas longas em etapas menores, com pausas " +
        "planejadas entre elas, reduzindo a sobrecarga de manter atenção sustentada por períodos muito longos.",
      "Rotinas previsíveis, instruções claras e objetivas, e o uso de recursos visuais de apoio também " +
        "aparecem como práticas úteis na literatura educacional sobre o tema.",
      "É fundamental lembrar que os desafios não se manifestam da mesma forma em todos os estudantes com " +
        "TDAH — e que muitos deles também apresentam pontos fortes importantes, como criatividade e " +
        "capacidade de hiperfoco em temas de interesse pessoal.",
    ],
  },
  {
    slug: "mitos-e-fatos",
    titulo: "Mitos e fatos sobre o TDAH",
    resumo: "Desconstruindo ideias equivocadas comuns sobre o transtorno, com base em evidências científicas.",
    fonte: "Manual Técnico NeuroClass, Parte II, capítulo 15",
    corpo: [
      "MITO: \"TDAH é falta de educação ou de limites impostos pelos pais.\" FATO: o TDAH é uma condição do " +
        "neurodesenvolvimento com base biológica, não uma consequência de criação ou disciplina.",
      "MITO: \"TDAH só existe em crianças com hiperatividade visível.\" FATO: existe uma apresentação " +
        "predominantemente desatenta, sem hiperatividade evidente, mais comum em meninas e frequentemente " +
        "subdiagnosticada.",
      "MITO: \"Quem tem TDAH não consegue se concentrar em nada.\" FATO: muitas pessoas com TDAH apresentam " +
        "hiperfoco — grande concentração em atividades de interesse — mesmo tendo dificuldade de atenção em " +
        "tarefas pouco estimulantes.",
      "FATO: o TDAH tem componente genético relevante, segundo a literatura científica, e pode persistir na " +
        "adolescência e na vida adulta, não sendo uma condição exclusiva da infância.",
    ],
  },
];

export function buscarArtigoPorSlug(slug) {
  return ARTIGOS.find((a) => a.slug === slug);
}
