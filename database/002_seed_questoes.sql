-- NeuroClass — Banco de questões inicial (seed)
-- Gerado a partir de generate_seed.py. Baseado no conteúdo científico da Parte II
-- do Manual Técnico e Científico (RN08: toda questão cita sua fonte).

-- Questão 1 (facil)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('O TDAH (Transtorno do Déficit de Atenção e Hiperatividade) é classificado, segundo o DSM-5, como um transtorno de qual tipo?', 'facil', 'CDC — cdc.gov/adhd; DSM-5, American Psychiatric Association', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('Transtorno do neurodesenvolvimento', true, 'Correto! O TDAH é um transtorno do neurodesenvolvimento, relacionado a diferenças no desenvolvimento e funcionamento do sistema nervoso central.'),
    ('Transtorno de personalidade', false, 'Incorreto. O TDAH não é classificado como transtorno de personalidade.'),
    ('Doença infecciosa', false, 'Incorreto. O TDAH não é uma doença infecciosa; é uma condição do neurodesenvolvimento.'),
    ('Traço de caráter', false, 'Incorreto. A ciência atual entende o TDAH como uma condição do neurodesenvolvimento, não como um traço de caráter ou escolha pessoal.')
) as v(texto, correta, feedback);

-- Questão 2 (facil)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Os sintomas do TDAH são organizados em quais dois grupos principais?', 'facil', 'CDC — cdc.gov/adhd', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('Desatenção e hiperatividade-impulsividade', true, 'Correto! Esses são os dois grupos de sintomas descritos pelos critérios diagnósticos.'),
    ('Ansiedade e depressão', false, 'Incorreto. Ansiedade e depressão são condições distintas, que podem ou não coexistir com o TDAH.'),
    ('Timidez e agressividade', false, 'Incorreto. Esses não são os grupos de sintomas usados para caracterizar o TDAH.'),
    ('Insônia e fadiga', false, 'Incorreto. Esses sintomas não definem os grupos diagnósticos do TDAH.')
) as v(texto, correta, feedback);

-- Questão 3 (facil)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Para caracterizar o TDAH, até que idade os sintomas precisam ter aparecido, segundo os critérios diagnósticos?', 'facil', 'CDC — cdc.gov/adhd; DSM-5', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('Antes dos 12 anos', true, 'Correto! Os sintomas precisam estar presentes antes dos 12 anos de idade.'),
    ('Antes dos 18 anos', false, 'Incorreto. O critério de idade estabelecido é antes dos 12 anos.'),
    ('Antes dos 6 anos', false, 'Incorreto. O critério de idade estabelecido é antes dos 12 anos, não dos 6.'),
    ('Não há critério de idade', false, 'Incorreto. Existe sim um critério de idade: antes dos 12 anos.')
) as v(texto, correta, feedback);

-- Questão 4 (facil)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Além de aparecer antes dos 12 anos, os sintomas do TDAH precisam ocorrer em quantos ambientes diferentes para caracterizar o transtorno?', 'facil', 'CDC — cdc.gov/adhd', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('Em mais de um ambiente (por exemplo, casa e escola)', true, 'Correto! Os sintomas precisam ocorrer em mais de um ambiente e causar prejuízo real ao funcionamento.'),
    ('Apenas em casa', false, 'Incorreto. Sintomas isolados em um único ambiente não bastam para caracterizar o transtorno.'),
    ('Apenas na escola', false, 'Incorreto. Sintomas isolados em um único ambiente não bastam para caracterizar o transtorno.'),
    ('Não é necessário ocorrer em mais de um ambiente', false, 'Incorreto. É exatamente esse critério — mais de um ambiente — que ajuda a diferenciar o transtorno de comportamentos pontuais.')
) as v(texto, correta, feedback);

-- Questão 5 (facil)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Quem pode diagnosticar o TDAH de forma válida, segundo o conteúdo educativo do NeuroClass?', 'facil', 'Manual Técnico NeuroClass, Parte II, capítulo 10', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('Um profissional de saúde qualificado (como psiquiatra, neurologista ou psicólogo com formação apropriada)', true, 'Correto! O diagnóstico é clínico e deve ser feito por profissional qualificado.'),
    ('Um quiz ou questionário online informal', false, 'Incorreto. Ferramentas de autoavaliação, incluindo quizzes como este, não substituem uma avaliação profissional.'),
    ('O próprio estudante, por autoavaliação', false, 'Incorreto. O diagnóstico não deve ser feito por autoavaliação.'),
    ('Um professor, com base no comportamento em sala', false, 'Incorreto. Professores podem observar sinais, mas não realizam o diagnóstico clínico.')
) as v(texto, correta, feedback);

-- Questão 6 (facil)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Qual das alternativas abaixo é um mito sobre o TDAH, segundo a literatura científica?', 'facil', 'Manual Técnico NeuroClass, Parte II, capítulo 15', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('"TDAH é falta de educação ou de limites impostos pelos pais."', true, 'Correto! Esse é um mito comum. O TDAH é uma condição do neurodesenvolvimento com base biológica.'),
    ('"O TDAH tem forte componente genético."', false, 'Incorreto, essa afirmação é um fato reconhecido pela literatura científica, não um mito.'),
    ('"O TDAH pode persistir na vida adulta."', false, 'Incorreto, essa afirmação é um fato: o TDAH persiste, em muitos casos, ao longo da vida.'),
    ('"O diagnóstico deve ser feito por profissional qualificado."', false, 'Incorreto, essa afirmação é um fato — o diagnóstico é sempre clínico e profissional.')
) as v(texto, correta, feedback);

-- Questão 7 (facil)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Segundo o conteúdo do site, o TDAH ocorre apenas em crianças com hiperatividade visível?', 'facil', 'Manual Técnico NeuroClass, Parte II, capítulo 15', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('Não — existe uma apresentação predominantemente desatenta, sem hiperatividade visível', true, 'Correto! Essa apresentação é mais comum em meninas e frequentemente subdiagnosticada.'),
    ('Sim — TDAH sempre envolve hiperatividade visível', false, 'Incorreto. Existe uma apresentação predominantemente desatenta, sem hiperatividade evidente.'),
    ('Sim — apenas crianças podem ter TDAH', false, 'Incorreto. O TDAH pode persistir na adolescência e na vida adulta.'),
    ('Não é possível afirmar nada sobre isso', false, 'Incorreto. A literatura científica é clara: existe apresentação predominantemente desatenta.')
) as v(texto, correta, feedback);

-- Questão 8 (facil)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Pessoas com TDAH podem apresentar hiperfoco. O que isso significa?', 'facil', 'Manual Técnico NeuroClass, Parte II, capítulo 15', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('Grande concentração em atividades de interesse, mesmo com dificuldade de atenção em tarefas pouco estimulantes', true, 'Correto! O hiperfoco coexiste com a dificuldade de manter atenção em tarefas pouco estimulantes.'),
    ('Incapacidade total de se concentrar em qualquer atividade', false, 'Incorreto. Esse é justamente o mito que o hiperfoco contraria.'),
    ('Um sintoma exclusivo de hiperatividade motora', false, 'Incorreto. Hiperfoco está relacionado à atenção, não à movimentação física.'),
    ('Uma forma de tratamento do TDAH', false, 'Incorreto. Hiperfoco é uma característica frequentemente relatada, não um tratamento.')
) as v(texto, correta, feedback);

-- Questão 9 (facil)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Qual é a finalidade da coleta de nome e e-mail antes do quiz do NeuroClass?', 'facil', 'Manual Técnico NeuroClass, Parte VIII, capítulo 50', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('Identificar o usuário no resultado e enviar o resultado do quiz por e-mail', true, 'Correto! Essa é a única finalidade da coleta, seguindo o princípio de minimização de dados.'),
    ('Realizar diagnóstico clínico do usuário', false, 'Incorreto. O sistema não realiza diagnóstico, apenas identifica o resultado do quiz.'),
    ('Cadastrar o usuário em uma lista de venda de produtos', false, 'Incorreto. O NeuroClass não tem qualquer funcionalidade de venda ou monetização.'),
    ('Compartilhar os dados com terceiros para fins de marketing', false, 'Incorreto. Os dados são usados exclusivamente para o resultado do quiz, conforme diretrizes de LGPD.')
) as v(texto, correta, feedback);

-- Questão 10 (facil)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Quantas questões compõem cada tentativa do quiz do NeuroClass, e quantas alternativas cada questão possui?', 'facil', 'Manual Técnico NeuroClass, Parte VIII, capítulo 52', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('10 questões, cada uma com 4 alternativas', true, 'Correto! Cada tentativa tem exatamente 10 questões, cada uma com 4 alternativas e uma correta.'),
    ('5 questões, cada uma com 2 alternativas', false, 'Incorreto. O padrão definido é 10 questões com 4 alternativas cada.'),
    ('20 questões, cada uma com 4 alternativas', false, 'Incorreto. O padrão definido é 10 questões, não 20.'),
    ('10 questões, cada uma com 5 alternativas', false, 'Incorreto. Cada questão tem exatamente 4 alternativas, não 5.')
) as v(texto, correta, feedback);

-- Questão 11 (facil)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('O TDAH costuma se manifestar da mesma forma em todos os estudantes que o têm?', 'facil', 'Manual Técnico NeuroClass, Parte II, capítulo 12', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('Não — a manifestação varia bastante entre estudantes, que também têm pontos fortes distintos', true, 'Correto! Os desafios não se manifestam da mesma forma em todos, e muitos apresentam pontos fortes como criatividade e capacidade de hiperfoco.'),
    ('Sim — todos os estudantes com TDAH apresentam exatamente os mesmos sintomas', false, 'Incorreto. Há grande variação individual na forma como o TDAH se manifesta.'),
    ('Sim, mas apenas em relação à hiperatividade', false, 'Incorreto. A variação ocorre em todos os aspectos, não apenas na hiperatividade.'),
    ('Não é possível generalizar nem mesmo dizer que há variação', false, 'Incorreto. A literatura é clara ao afirmar que há variação individual significativa.')
) as v(texto, correta, feedback);

-- Questão 12 (facil)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Qual das opções abaixo está DENTRO do escopo do sistema NeuroClass?', 'facil', 'Manual Técnico NeuroClass, Parte I, capítulo 8', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('Conteúdo educativo sobre TDAH e quiz de conhecimento', true, 'Correto! Conteúdo educativo, quiz, cadastro simples e área de vídeo institucional estão no escopo.'),
    ('Diagnóstico clínico automatizado do usuário', false, 'Incorreto. Diagnóstico está explicitamente fora do escopo do sistema.'),
    ('Chat em tempo real com profissionais de saúde', false, 'Incorreto. Esse recurso está explicitamente fora do escopo do sistema.'),
    ('Venda de produtos relacionados ao TDAH', false, 'Incorreto. Qualquer funcionalidade de venda ou monetização está fora do escopo.')
) as v(texto, correta, feedback);

-- Questão 13 (medio)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Um professor observa que um aluno com TDAH tem dificuldade em terminar tarefas longas, mas se destaca em um projeto sobre um tema de forte interesse pessoal. Qual conceito explica melhor essa situação?', 'medio', 'Manual Técnico NeuroClass, Parte II, capítulo 12', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('Hiperfoco em atividades de interesse, coexistindo com dificuldade em tarefas pouco estimulantes', true, 'Correto! Esse é exatamente o padrão descrito na literatura: hiperfoco em temas de interesse.'),
    ('O aluno não tem TDAH, já que conseguiu se concentrar no projeto', false, 'Incorreto. A capacidade de hiperfoco em temas de interesse é compatível com o TDAH, não o descarta.'),
    ('O aluno está fingindo ter dificuldades nas outras tarefas', false, 'Incorreto. Essa interpretação reforça um estigma; a variação de atenção é uma característica real do transtorno.'),
    ('Isso indica que o TDAH foi superado', false, 'Incorreto. O TDAH não é "superado" por um episódio pontual de concentração.')
) as v(texto, correta, feedback);

-- Questão 14 (medio)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Por que a organização típica de uma sala de aula tradicional pode ser especialmente desafiadora para um estudante com TDAH?', 'medio', 'Manual Técnico NeuroClass, Parte II, capítulo 11', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('Porque exige atenção sustentada por longos períodos, tarefas sequenciais e permanência sentado', true, 'Correto! Esses elementos podem conflitar diretamente com as características do transtorno.'),
    ('Porque salas de aula tradicionais não têm cadeiras confortáveis', false, 'Incorreto. O desafio está relacionado à estrutura de atenção e permanência exigida, não ao conforto físico.'),
    ('Porque o TDAH afeta exclusivamente a visão do estudante', false, 'Incorreto. O TDAH não é um transtorno visual.'),
    ('Porque professores nunca recebem formação sobre o tema', false, 'Incorreto, essa não é a explicação central — embora a formação docente também seja relevante, o desafio principal está na estrutura da sala de aula tradicional.')
) as v(texto, correta, feedback);

-- Questão 15 (medio)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Uma colega de classe diz: "Ele só não presta atenção porque não quer, é falta de esforço." Como essa afirmação deve ser avaliada à luz do conteúdo científico apresentado?', 'medio', 'Manual Técnico NeuroClass, Parte II, capítulo 10', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('É um mito — o TDAH tem base biológica no neurodesenvolvimento, não é falta de esforço ou disciplina', true, 'Correto! Reduzir o TDAH a falta de esforço é um dos erros mais comuns de interpretação.'),
    ('É verdade, já que TDAH é uma escolha do estudante', false, 'Incorreto. O TDAH não é uma escolha; está relacionado a diferenças no funcionamento do sistema nervoso.'),
    ('É parcialmente verdade, dependendo do estudante', false, 'Incorreto. A base biológica do transtorno não depende da motivação individual do estudante.'),
    ('Não há como avaliar essa afirmação cientificamente', false, 'Incorreto. A literatura científica é clara ao rejeitar essa explicação.')
) as v(texto, correta, feedback);

-- Questão 16 (medio)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Um estudante com TDAH relata dificuldade em organizar prazos de entregas de trabalhos, mesmo entendendo o conteúdo das matérias. A qual grupo de funções esse desafio está mais associado?', 'medio', 'Manual Técnico NeuroClass, Parte II, capítulo 12', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('Funções executivas (organização e planejamento de tarefas e prazos)', true, 'Correto! Dificuldades de organização e planejamento estão entre os desafios mais relatados na literatura.'),
    ('Capacidade intelectual geral', false, 'Incorreto. O TDAH não implica menor capacidade intelectual; o desafio é de organização, não de inteligência.'),
    ('Audição e processamento sonoro', false, 'Incorreto. Esse não é o tipo de desafio associado ao caso descrito.'),
    ('Memória de longo prazo sobre fatos históricos', false, 'Incorreto. O desafio descrito é de organização e planejamento, não de memorização de fatos.')
) as v(texto, correta, feedback);

-- Questão 17 (medio)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Uma escola implementa divisão de tarefas longas em etapas menores, com pausas planejadas, para apoiar estudantes com TDAH. Essa estratégia se enquadra em qual categoria de apoio?', 'medio', 'Manual Técnico NeuroClass, Parte II, capítulo 13', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('Estratégias de apoio à organização e à atenção sustentada', true, 'Correto! Divisão de tarefas em etapas menores é uma das estratégias recomendadas pela literatura.'),
    ('Tratamento medicamentoso', false, 'Incorreto. Essa é uma estratégia pedagógica de organização, não um tratamento medicamentoso.'),
    ('Diagnóstico clínico', false, 'Incorreto. Isso não tem relação com diagnóstico, e sim com apoio pedagógico no dia a dia.'),
    ('Uma forma de avaliação de inteligência', false, 'Incorreto. Essa estratégia não avalia inteligência; ela apoia organização e atenção.')
) as v(texto, correta, feedback);

-- Questão 18 (medio)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Por que o quiz do NeuroClass não deve ser apresentado como um instrumento de diagnóstico?', 'medio', 'Manual Técnico NeuroClass, Parte II, capítulo 10; Parte VIII, capítulo 58', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('Porque o diagnóstico é clínico e exige avaliação por profissional qualificado, com base em múltiplos critérios', true, 'Correto! Ferramentas de autoavaliação, incluindo o quiz, não substituem esse processo clínico.'),
    ('Porque o quiz tem poucas questões para ser confiável', false, 'Incorreto. O motivo central não é o número de questões, e sim a natureza clínica do diagnóstico.'),
    ('Porque o quiz foi feito apenas para entreter os usuários', false, 'Incorreto. O quiz tem propósito educativo de avaliação de conhecimento, mas o motivo de não ser diagnóstico é a exigência de avaliação clínica profissional.'),
    ('Não há problema em apresentar o quiz como diagnóstico, se o resultado for bom', false, 'Incorreto. Em nenhuma hipótese o resultado do quiz deve sugerir diagnóstico individual (RN09).')
) as v(texto, correta, feedback);

-- Questão 19 (medio)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Em uma tentativa de quiz em andamento, o usuário responde a questão 3 e depois volta à tela inicial do navegador antes de continuar. O que deve acontecer com a ordem das questões e alternativas já sorteadas?', 'medio', 'Manual Técnico NeuroClass, Parte VIII, capítulo 54', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('A ordem permanece exatamente a mesma até o fim daquela tentativa', true, 'Correto! A ordem sorteada é fixada na criação da tentativa e não muda até seu término (RN04).'),
    ('A ordem é sorteada novamente a cada questão respondida', false, 'Incorreto. Isso violaria a regra de estabilidade da ordem dentro de uma mesma tentativa.'),
    ('A ordem é sorteada novamente sempre que a página é recarregada', false, 'Incorreto. A ordem deve permanecer estável durante toda a tentativa em curso.'),
    ('Não há ordem sorteada, as questões seguem sempre a mesma sequência fixa', false, 'Incorreto. A ordem é sorteada a cada nova tentativa (RN03), mas fica fixa dentro da tentativa atual.')
) as v(texto, correta, feedback);

-- Questão 20 (medio)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Um estudante do público-alvo do NeuroClass pode ter dificuldades de atenção e organização. Como isso influencia as decisões de design da interface, segundo o manual?', 'medio', 'Manual Técnico NeuroClass, Parte I, capítulo 5; Parte III, capítulo 20', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('A interface deve evitar movimento automático constante, pop-ups inesperados e excesso de estímulos', true, 'Correto! A redução de carga cognitiva e a ausência de distrações são princípios centrais de UX do projeto.'),
    ('A interface deve ter o máximo possível de animações para prender a atenção', false, 'Incorreto. O manual recomenda justamente evitar elementos com movimento automático constante.'),
    ('A interface não precisa considerar o público-alvo, pois o design é padrão', false, 'Incorreto. As implicações de design consideram diretamente as características do público-alvo.'),
    ('A interface deve usar o máximo de cores possível para ser mais chamativa', false, 'Incorreto. O manual recomenda uso criterioso da cor principal (azul), não excesso de cores.')
) as v(texto, correta, feedback);

-- Questão 21 (medio)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Por que a resposta correta de uma questão do quiz nunca deve ser enviada ao frontend antes de o usuário responder?', 'medio', 'Manual Técnico NeuroClass, Parte VIII, capítulo 55', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('Para impedir que a resposta seja lida no código-fonte ou no tráfego de rede antes da resposta do usuário', true, 'Correto! Essa é a garantia de segurança RNF01: a lógica de correção fica no backend.'),
    ('Porque isso deixaria o site mais lento', false, 'Incorreto. O motivo é de segurança da lógica de negócio, não de performance.'),
    ('Não há motivo técnico específico, é apenas uma preferência de design', false, 'Incorreto. Há um motivo de segurança bem definido: evitar manipulação da resposta correta pelo usuário.'),
    ('Porque o backend não tem capacidade de armazenar essa informação', false, 'Incorreto. O backend armazena sim a informação; ele apenas não a envia antecipadamente ao frontend.')
) as v(texto, correta, feedback);

-- Questão 22 (medio)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Um estudante do ensino médio relata que colegas o rotulam negativamente por causa de comportamentos associados ao TDAH. Segundo o conteúdo educativo, o que isso reflete?', 'medio', 'Manual Técnico NeuroClass, Parte II, capítulo 12', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('Maior vulnerabilidade a rótulos negativos por parte de colegas e educadores com pouco conhecimento sobre o transtorno', true, 'Correto! Esse é um dos desafios relatados na literatura sobre TDAH no contexto escolar.'),
    ('Uma consequência inevitável e sem relação com falta de informação', false, 'Incorreto. A literatura associa esse fenômeno à falta de conhecimento sobre o transtorno, algo que pode ser combatido com conscientização.'),
    ('Prova de que o estudante realmente não se esforça', false, 'Incorreto. Essa interpretação reforça um mito já refutado pela ciência.'),
    ('Um problema exclusivamente familiar, sem relação com a escola', false, 'Incorreto. O relato descrito ocorre especificamente no ambiente escolar, entre colegas.')
) as v(texto, correta, feedback);

-- Questão 23 (dificil)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Uma escola decide implementar um programa de intervenção baseado na escola (school-based intervention) para apoiar estudantes com TDAH, mas oferece o suporte apenas durante um bimestre e depois interrompe. Com base na literatura citada no material, qual é o problema central dessa abordagem?', 'dificil', 'PAIANO et al., Revista Educação Especial, 2019', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('A falta de continuidade do suporte ao longo do ano letivo compromete os benefícios observados', true, 'Correto! Os resultados sugerem benefício quando há identificação precoce e continuidade do suporte ao longo do ano letivo, não apenas em um período isolado.'),
    ('Programas de intervenção escolar nunca trazem benefício, independentemente da duração', false, 'Incorreto. A literatura sugere benefício quando há continuidade — o problema é a interrupção, não o programa em si.'),
    ('O problema é que a escola não cobrou os pais pelo programa', false, 'Incorreto. Essa questão não tem relação com o achado da literatura citada.'),
    ('Não há problema, pois um bimestre já é tempo suficiente segundo a literatura', false, 'Incorreto. A literatura associa benefício à continuidade ao longo do ano letivo, não a períodos curtos e isolados.')
) as v(texto, correta, feedback);

-- Questão 24 (dificil)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Um backend recebe uma requisição em POST /quiz/responder com um alternativa_id que não pertence à questao_id informada na mesma requisição. Qual comportamento está alinhado às diretrizes de tratamento de erros do manual?', 'dificil', 'Manual Técnico NeuroClass, Parte VI, capítulos 40 e 41', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('Rejeitar a requisição com um erro de validação/regra de negócio, sem processar a resposta como válida', true, 'Correto! A entrada deve ser validada antes de qualquer processamento, e uma inconsistência entre questão e alternativa é uma violação de regra de negócio a ser tratada explicitamente.'),
    ('Aceitar a resposta e marcá-la como incorreta automaticamente, sem retornar erro', false, 'Incorreto. Isso mascararia um erro de integridade como se fosse uma resposta legítima do usuário.'),
    ('Ignorar a inconsistência e salvar a alternativa mesmo assim, pois isso simplifica o código', false, 'Incorreto. Isso comprometeria a integridade referencial e a confiabilidade dos dados armazenados.'),
    ('Repassar o erro bruto do banco de dados diretamente ao frontend', false, 'Incorreto. O manual orienta explicitamente a nunca repassar erros brutos do banco ao frontend.')
) as v(texto, correta, feedback);

-- Questão 25 (dificil)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Durante a auditoria final do projeto, a equipe percebe que a chave do Supabase usada pelo backend também está sendo exposta em uma variável de ambiente do frontend na Vercel. Qual é a análise correta dessa situação, segundo o manual?', 'dificil', 'Manual Técnico NeuroClass, Parte IV, capítulo 28; Parte V, capítulo 34', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('É uma falha de segurança grave: a chave do Supabase deve ser usada apenas pelo backend, nunca exposta ao frontend', true, 'Correto! O acesso ao banco deve ficar restrito ao backend; expor essa chave no frontend viola RNF01 e RNF04.'),
    ('É uma prática aceitável, desde que a chave também esteja no backend', false, 'Incorreto. Mesmo estando também no backend, a exposição no frontend já constitui uma falha de segurança.'),
    ('Não há problema, pois o Supabase criptografa automaticamente todas as chaves expostas', false, 'Incorreto. A criptografia em trânsito não resolve o problema de uma chave sensível acessível no código do cliente.'),
    ('É um problema apenas se o site for acessado fora do Brasil', false, 'Incorreto. A localização do acesso não é relevante para esse risco de segurança.')
) as v(texto, correta, feedback);

-- Questão 26 (dificil)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Considerando a regra de negócio RN07 (não reutilizar a mesma sequência de questões entre tentativas consecutivas de forma previsível) e um banco de questões da dificuldade "fácil" com apenas 10 questões ativas, qual é a implicação prática mais correta?', 'dificil', 'Manual Técnico NeuroClass, Parte VIII, capítulos 52 e 54', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('As 10 questões serão sempre as mesmas, mas a ordem de apresentação delas e de suas alternativas deve variar entre tentativas', true, 'Correto! Com exatamente 10 questões ativas, a seleção de quais questões aparecem é forçada, mas a ordem sorteada de questões e alternativas ainda deve variar a cada tentativa.'),
    ('O sistema deve impedir uma nova tentativa até que mais questões sejam cadastradas', false, 'Incorreto. O manual não prevê bloqueio de novas tentativas; a variação recai sobre a ordem, não sobre a impossibilidade de repetir questões quando o banco é pequeno.'),
    ('A ordem pode ser sempre a mesma, pois com apenas 10 questões não há o que variar', false, 'Incorreto. Mesmo com exatamente 10 questões, a ordem de apresentação e a posição das alternativas corretas ainda devem ser sorteadas novamente a cada tentativa.'),
    ('O sistema deve inventar novas questões automaticamente para evitar repetição', false, 'Incorreto. Questões nunca devem ser inventadas automaticamente; o conteúdo deve derivar do material educativo validado (Parte VIII, capítulo 52).')
) as v(texto, correta, feedback);

-- Questão 27 (dificil)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Um membro da equipe sugere adicionar uma tabela "diagnostico_provavel" ao banco de dados, para estimar a probabilidade de um usuário ter TDAH com base nas respostas do quiz. Como essa proposta deve ser avaliada frente ao manual?', 'dificil', 'Manual Técnico NeuroClass, Parte I, capítulo 8; Parte V, capítulo 31', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('Deve ser rejeitada: está fora do escopo do sistema e nenhuma entidade relacionada a diagnóstico deve ser criada', true, 'Correto! O manual proíbe explicitamente qualquer forma de diagnóstico, triagem clínica ou cálculo de probabilidade de TDAH, e nenhuma entidade adicional desse tipo deve ser criada.'),
    ('Deve ser aceita, desde que a tabela fique oculta do usuário final', false, 'Incorreto. O escopo do sistema proíbe esse tipo de funcionalidade independentemente de estar visível ou não ao usuário final.'),
    ('Deve ser aceita, pois enriquece cientificamente o produto do TCC', false, 'Incorreto. O manual é explícito: cálculo de probabilidade de TDAH está fora do escopo, mesmo com boa intenção.'),
    ('Deve ser aceita apenas para os usuários que derem consentimento explícito', false, 'Incorreto. Mesmo com consentimento, esse tipo de funcionalidade está fora do escopo definido para o sistema.')
) as v(texto, correta, feedback);

-- Questão 28 (dificil)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Em uma revisão de segurança, a equipe encontra o seguinte trecho de log do backend em produção: "usuário autenticado com senha=123456". Quais diretrizes do manual essa prática viola?', 'dificil', 'Manual Técnico NeuroClass, Parte VI, capítulo 42; Parte XI, capítulo 72', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('A diretriz de nunca logar dados sensíveis (como senhas) em texto plano', true, 'Correto! O manual determina explicitamente nunca logar dados sensíveis, como senhas ou tokens, em texto plano.'),
    ('Nenhuma diretriz é violada, pois logs são apenas para uso interno da equipe', false, 'Incorreto. Mesmo sendo de uso interno, logar dados sensíveis em texto plano é uma prática proibida.'),
    ('Apenas a diretriz de performance é violada', false, 'Incorreto. O problema identificado é de segurança (exposição de dado sensível), não de performance.'),
    ('Apenas a diretriz de responsividade é violada', false, 'Incorreto. Responsividade refere-se à adaptação de interface a diferentes telas, sem relação com este caso.')
) as v(texto, correta, feedback);

-- Questão 29 (dificil)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Considerando o fluxo de dados do quiz descrito na Parte IV, capítulo 29, em qual etapa exatamente o gabarito (informação de qual alternativa é correta) fica associado à tentativa no servidor, sem ainda ser enviado ao frontend?', 'dificil', 'Manual Técnico NeuroClass, Parte IV, capítulo 29', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('Na etapa em que o backend seleciona as 10 questões, sorteia a ordem e armazena a "chave" da tentativa', true, 'Correto! O backend armazena a ordem sorteada (a chave da tentativa) associada ao usuário, sem enviar a resposta correta ao frontend nesse momento.'),
    ('Somente depois que o usuário conclui as 10 questões', false, 'Incorreto. O gabarito já está associado à tentativa desde a criação; ele apenas não é enviado antecipadamente ao frontend.'),
    ('Na etapa em que o e-mail de resultado é enviado', false, 'Incorreto. O envio de e-mail ocorre apenas ao final, após o cálculo de pontuação, não na definição do gabarito.'),
    ('O gabarito nunca fica armazenado no servidor, apenas no navegador do usuário', false, 'Incorreto. Isso violaria diretamente o RNF01; o gabarito deve residir exclusivamente no backend.')
) as v(texto, correta, feedback);

-- Questão 30 (dificil)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Um estudo é encontrado em um blog não especializado, sem citação de fonte primária, afirmando uma estatística específica sobre prevalência de TDAH. Segundo o fluxo de validação de conteúdo do manual, qual é o procedimento correto antes de publicar essa informação no site?', 'dificil', 'Manual Técnico NeuroClass, Parte II, capítulo 16', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('Buscar a informação em fontes primárias confiáveis e comparar com pelo menos uma segunda fonte independente antes de publicar, ou usar linguagem qualitativa se não for possível confirmar', true, 'Correto! O fluxo de validação exige comparação entre fontes confiáveis e, na dúvida, uso de linguagem qualitativa em vez de estatística não confirmada.'),
    ('Publicar a estatística imediatamente, citando o blog como fonte', false, 'Incorreto. Um blog não especializado, sem fonte primária, não atende ao critério de confiabilidade exigido.'),
    ('Publicar a estatística sem citar nenhuma fonte, para simplificar o texto', false, 'Incorreto. Toda afirmação do site deve citar a fonte de origem (RN08).'),
    ('Ignorar completamente qualquer dado sobre prevalência no site', false, 'Incorreto. O procedimento correto não é ignorar o tema, e sim validar a informação com fontes primárias confiáveis antes de publicá-la.')
) as v(texto, correta, feedback);

-- Questão 31 (dificil)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('A equipe percebe que, ao excluir uma questão do banco (tabela questoes), o banco de dados também remove automaticamente todas as alternativas associadas a ela, mas bloqueia a exclusão se existirem respostas de tentativas já concluídas referenciando essa questão. O que isso demonstra sobre o modelo relacional?', 'dificil', 'Manual Técnico NeuroClass, Parte V, capítulos 32 e 33; Parte XI, capítulo 71', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('O uso correto de ON DELETE CASCADE entre questoes e alternativas, e de integridade referencial protegendo o histórico de respostas já registradas', true, 'Correto! Alternativas são removidas em cascata com a questão, mas respostas de tentativas concluídas preservam a integridade referencial e a rastreabilidade do histórico.'),
    ('Um erro de modelagem, pois nada deveria impedir a exclusão de uma questão', false, 'Incorreto. Impedir a exclusão quando há respostas associadas é exatamente o comportamento esperado para preservar a rastreabilidade das tentativas já realizadas.'),
    ('Isso mostra que a tabela respostas não deveria existir no modelo', false, 'Incorreto. A tabela respostas é essencial para reconstruir o que foi apresentado e escolhido em cada tentativa (Parte V, capítulo 32).'),
    ('Isso mostra que alternativas deveriam ter exclusão bloqueada como questoes', false, 'Incorreto. Alternativas são um detalhe de uma questão específica; removê-las em cascata junto com a questão é o comportamento correto quando a própria questão pode ser removida.')
) as v(texto, correta, feedback);

-- Questão 32 (dificil)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Durante os testes específicos do quiz, a equipe roda 50 tentativas seguidas na dificuldade "médio" e percebe que a primeira questão sorteada é sempre a mesma nas 50 tentativas, embora as demais variem. O que essa observação indica, segundo a Parte VIII, capítulo 59?', 'dificil', 'Manual Técnico NeuroClass, Parte VIII, capítulos 54 e 59', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('Uma falha na aleatorização: a ordem das questões precisa variar de forma consistente entre tentativas, não apenas parcialmente', true, 'Correto! Os testes específicos do quiz devem verificar se a ordem das questões realmente muda entre tentativas distintas — uma posição fixa recorrente indica falha na implementação do sorteio.'),
    ('É um comportamento esperado, pois a primeira questão deve ser sempre fixa por padrão', false, 'Incorreto. Não há previsão no manual de que qualquer posição fique fixa entre tentativas distintas.'),
    ('Não há problema, desde que as outras nove questões estejam corretamente aleatorizadas', false, 'Incorreto. A regra de aleatorização (RN03) se aplica à ordem completa, incluindo a primeira posição.'),
    ('Isso só seria um problema se acontecesse também com as alternativas, não com as questões', false, 'Incorreto. Tanto a ordem das questões quanto a das alternativas devem ser verificadas separadamente nos testes, conforme a Parte VIII, capítulo 59.')
) as v(texto, correta, feedback);

