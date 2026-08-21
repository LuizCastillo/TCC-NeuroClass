/**
 * Conteúdo educativo do NeuroClass.
 * Cada artigo cita apenas fontes reais e publicamente verificáveis: CDC,
 * DSM-5, CHADD (Children and Adults with Attention-Deficit/Hyperactivity
 * Disorder) e o estudo de Paiano et al. (2019). O banco de questões do quiz
 * deriva exclusivamente deste conteúdo.
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
        "A partir deles, o DSM-5 descreve três apresentações possíveis: predominantemente desatenta, " +
        "predominantemente hiperativa-impulsiva, ou combinada (quando os dois grupos de sintomas estão presentes).",
      "Para caracterizar o transtorno, os critérios diagnósticos consideram que os sintomas precisam ter " +
        "aparecido antes dos 12 anos de idade e ocorrer em mais de um ambiente — por exemplo, em casa e na " +
        "escola — causando prejuízo real ao funcionamento da pessoa.",
      "O diagnóstico do TDAH é sempre clínico, feito por um profissional de saúde qualificado, como psiquiatra, " +
        "neurologista ou psicólogo com formação apropriada, e não por ferramentas de autoavaliação.",
      "Embora seja frequentemente identificado na infância, o TDAH pode persistir ao longo da vida: segundo a " +
        "CHADD (organização de referência nos EUA sobre o tema), a maioria das crianças com TDAH continua " +
        "apresentando sintomas na vida adulta.",
    ],
  },
  {
    slug: "desafios-na-escola",
    titulo: "Desafios comuns na escola",
    resumo: "Como a estrutura tradicional da sala de aula pode ser desafiadora para estudantes com TDAH.",
    fonte: "PAIANO et al., Revista Educação Especial (UFSM), v. 32, 2019; DSM-5, American Psychiatric Association",
    corpo: [
      "A organização típica de uma sala de aula tradicional — que exige atenção sustentada por longos " +
        "períodos, tarefas sequenciais e permanência sentado — pode conflitar diretamente com as " +
        "características do TDAH.",
      "O próprio DSM-5 observa que os sinais do transtorno podem variar conforme o contexto: podem ficar " +
        "mínimos ou ausentes quando a pessoa recebe recompensas frequentes por comportamento apropriado, está " +
        "sob supervisão direta, em uma situação nova, ou envolvida em atividades de forte interesse pessoal.",
      "Uma revisão sistemática de programas de intervenção escolar para TDAH (Paiano et al., 2019) apontou que " +
        "a identificação precoce e a continuidade do suporte ao longo do ano letivo trazem benefícios reais " +
        "para os estudantes.",
      "A mesma revisão identificou um obstáculo comum: como grande parte dos programas de intervenção depende " +
        "da adesão dos próprios professores como mediadores, a falta desse engajamento pode comprometer os " +
        "resultados — reforçando a importância do envolvimento da escola como um todo, e não apenas de " +
        "iniciativas pontuais e isoladas.",
    ],
  },
  {
    slug: "estrategias-de-apoio",
    titulo: "Estratégias de apoio",
    resumo: "Acomodações de sala de aula que podem ajudar estudantes com TDAH a lidar com os desafios do dia a dia.",
    fonte: "CHADD — chadd.org/for-educators/classroom-accommodations",
    corpo: [
      "A CHADD (Children and Adults with Attention-Deficit/Hyperactivity Disorder), organização de referência " +
        "nos EUA sobre o tema, reúne diversas acomodações de sala de aula recomendadas para apoiar estudantes " +
        "com TDAH.",
      "Uma das estratégias recomendadas é dividir tarefas longas em partes menores — isso permite que o " +
        "estudante enxergue tanto o início quanto o fim da atividade, tornando-a menos sobrecarregante.",
      "Posicionar o estudante perto de colegas que sirvam de modelo positivo, e longe de fontes de distração, " +
        "também é uma acomodação recomendada para ajudar a manter o foco durante as aulas.",
      "Salas de aula bem geridas costumam ter regras e rotinas bem estabelecidas e conhecidas por todos os " +
        "estudantes, com transições suaves entre atividades e um ambiente físico com menos elementos " +
        "visualmente distrativos.",
      "É importante lembrar que os desafios não se manifestam da mesma forma em todos os estudantes com TDAH — " +
        "e que muitos deles também apresentam pontos fortes importantes, como criatividade e grande capacidade " +
        "de concentração em atividades de forte interesse pessoal.",
    ],
  },
  {
    slug: "mitos-e-fatos",
    titulo: "Mitos e fatos sobre o TDAH",
    resumo: "Desconstruindo ideias equivocadas comuns sobre o transtorno, com base em fontes científicas reais.",
    fonte: "CHADD — chadd.org/about-adhd/myths-and-misunderstandings",
    corpo: [
      "MITO: \"TDAH é causado por falta de educação ou de limites impostos pelos pais.\" FATO: segundo a CHADD, " +
        "estudos apontam fatores genéticos (hereditários) e neurológicos — não fatores sociais como uma " +
        "criação inadequada — como as principais causas do TDAH.",
      "FATO: o TDAH tem um componente genético relevante. De acordo com pesquisas citadas pela CHADD (Barkley, " +
        "2015), há cerca de 57% de chance de uma criança desenvolver TDAH se um dos pais tem o transtorno, e " +
        "entre 70% e 80% de chance no caso de gêmeos, se um deles tem TDAH.",
      "FATO: o TDAH é considerado um transtorno que acompanha a pessoa ao longo da vida (\"lifespan disorder\"). " +
        "A maioria das crianças diagnosticadas continua apresentando sintomas na vida adulta.",
      "MITO: \"TDAH só existe em crianças com hiperatividade visível.\" FATO: como descrito pelo DSM-5, existe " +
        "uma apresentação predominantemente desatenta, sem hiperatividade evidente, além da apresentação " +
        "combinada — nem toda pessoa com TDAH é visivelmente hiperativa.",
    ],
  },
];

export function buscarArtigoPorSlug(slug) {
  return ARTIGOS.find((a) => a.slug === slug);
}
