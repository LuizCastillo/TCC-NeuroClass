-- NeuroClass — Banco de questões (seed)
-- Gerado a partir de generate_seed.py. Todas as questões tratam exclusivamente
-- do conteúdo educativo sobre TDAH apresentado no site, com fontes reais e
-- publicamente verificáveis (CDC, DSM-5, CHADD, Paiano et al. 2019).

-- Questão 1 (facil)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('O TDAH (Transtorno do Déficit de Atenção e Hiperatividade) é classificado como um transtorno de qual tipo?', 'facil', 'CDC — cdc.gov/adhd; DSM-5, American Psychiatric Association', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('Transtorno do neurodesenvolvimento', true, 'Correto! O TDAH é um transtorno do neurodesenvolvimento, relacionado a diferenças no desenvolvimento e funcionamento do sistema nervoso central.'),
    ('Transtorno de personalidade', false, 'Incorreto. O TDAH não é classificado como transtorno de personalidade.'),
    ('Doença infecciosa', false, 'Incorreto. O TDAH não é uma doença infecciosa; é uma condição do neurodesenvolvimento.'),
    ('Traço de caráter', false, 'Incorreto. A ciência atual entende o TDAH como uma condição do neurodesenvolvimento, não como um traço de caráter.')
) as v(texto, correta, feedback);

-- Questão 2 (facil)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Os sintomas do TDAH são organizados em quais dois grupos principais?', 'facil', 'CDC — cdc.gov/adhd; DSM-5, American Psychiatric Association', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('Desatenção e hiperatividade-impulsividade', true, 'Correto! Esses são os dois grupos de sintomas descritos pelos critérios diagnósticos do DSM-5.'),
    ('Ansiedade e depressão', false, 'Incorreto. Ansiedade e depressão são condições distintas, que podem ou não coexistir com o TDAH.'),
    ('Timidez e agressividade', false, 'Incorreto. Esses não são os grupos de sintomas usados para caracterizar o TDAH.'),
    ('Insônia e fadiga', false, 'Incorreto. Esses sintomas não definem os grupos diagnósticos do TDAH.')
) as v(texto, correta, feedback);

-- Questão 3 (facil)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Segundo o DSM-5, quais são as três apresentações possíveis do TDAH?', 'facil', 'CDC — cdc.gov/adhd; DSM-5, American Psychiatric Association', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('Predominantemente desatenta, predominantemente hiperativa-impulsiva, ou combinada', true, 'Correto! São essas as três apresentações descritas pelo DSM-5, a partir dos dois grupos de sintomas.'),
    ('Leve, moderada e grave apenas', false, 'Incorreto. Embora existam níveis de gravidade, a pergunta trata das três apresentações baseadas nos grupos de sintomas.'),
    ('Infantil, adolescente e adulta', false, 'Incorreto. Essas não são as apresentações descritas pelo DSM-5 para o TDAH.'),
    ('Genética, ambiental e mista', false, 'Incorreto. Essas categorias não correspondem às apresentações clínicas do TDAH.')
) as v(texto, correta, feedback);

-- Questão 4 (facil)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Para caracterizar o TDAH, até que idade os sintomas precisam ter aparecido, segundo os critérios diagnósticos?', 'facil', 'CDC — cdc.gov/adhd; DSM-5, American Psychiatric Association', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('Antes dos 12 anos', true, 'Correto! Os sintomas precisam estar presentes antes dos 12 anos de idade.'),
    ('Antes dos 18 anos', false, 'Incorreto. O critério de idade estabelecido é antes dos 12 anos.'),
    ('Antes dos 6 anos', false, 'Incorreto. O critério de idade estabelecido é antes dos 12 anos, não dos 6.'),
    ('Não há critério de idade', false, 'Incorreto. Existe sim um critério de idade: antes dos 12 anos.')
) as v(texto, correta, feedback);

-- Questão 5 (facil)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Além de aparecer antes dos 12 anos, em quantos ambientes diferentes os sintomas do TDAH precisam ocorrer para caracterizar o transtorno?', 'facil', 'CDC — cdc.gov/adhd; DSM-5, American Psychiatric Association', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('Em mais de um ambiente (por exemplo, casa e escola)', true, 'Correto! Os sintomas precisam ocorrer em mais de um ambiente e causar prejuízo real ao funcionamento.'),
    ('Apenas em casa', false, 'Incorreto. Sintomas isolados em um único ambiente não bastam para caracterizar o transtorno.'),
    ('Apenas na escola', false, 'Incorreto. Sintomas isolados em um único ambiente não bastam para caracterizar o transtorno.'),
    ('Não é necessário ocorrer em mais de um ambiente', false, 'Incorreto. É exatamente esse critério que ajuda a diferenciar o transtorno de comportamentos pontuais.')
) as v(texto, correta, feedback);

-- Questão 6 (facil)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Quem pode diagnosticar o TDAH de forma válida?', 'facil', 'CDC — cdc.gov/adhd; DSM-5, American Psychiatric Association', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('Um profissional de saúde qualificado (como psiquiatra, neurologista ou psicólogo com formação apropriada)', true, 'Correto! O diagnóstico é clínico e deve ser feito por profissional qualificado.'),
    ('Um quiz ou questionário online informal', false, 'Incorreto. Ferramentas de autoavaliação não substituem uma avaliação profissional.'),
    ('O próprio estudante, por autoavaliação', false, 'Incorreto. O diagnóstico não deve ser feito por autoavaliação.'),
    ('Um professor, com base no comportamento em sala', false, 'Incorreto. Professores podem observar sinais, mas não realizam o diagnóstico clínico.')
) as v(texto, correta, feedback);

-- Questão 7 (facil)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('O TDAH é uma condição exclusiva da infância?', 'facil', 'CHADD — chadd.org/about-adhd/myths-and-misunderstandings', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('Não — é considerado um transtorno que pode acompanhar a pessoa ao longo da vida', true, 'Correto! Segundo a CHADD, a maioria das crianças com TDAH continua apresentando sintomas na vida adulta.'),
    ('Sim — os sintomas sempre desaparecem completamente na adolescência', false, 'Incorreto. O TDAH é descrito como um transtorno que pode persistir ao longo da vida.'),
    ('Sim — TDAH só pode ser diagnosticado em crianças', false, 'Incorreto. Embora costume ser identificado na infância, o transtorno pode persistir na vida adulta.'),
    ('Não é possível saber se os sintomas persistem', false, 'Incorreto. Há evidência clara de que a maioria dos casos persiste na vida adulta.')
) as v(texto, correta, feedback);

-- Questão 8 (facil)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Segundo a CHADD, qual das alternativas abaixo é um mito sobre as causas do TDAH?', 'facil', 'CHADD — chadd.org/about-adhd/myths-and-misunderstandings', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('"TDAH é causado por falta de educação ou de limites impostos pelos pais."', true, 'Correto! Esse é um mito comum. Estudos apontam fatores genéticos e neurológicos como as principais causas, não fatores sociais como a criação.'),
    ('"O TDAH tem componente genético relevante."', false, 'Incorreto, essa afirmação é um fato apontado pela CHADD, não um mito.'),
    ('"O TDAH pode persistir na vida adulta."', false, 'Incorreto, essa afirmação é um fato: o TDAH é descrito como um transtorno que dura a vida toda.'),
    ('"O diagnóstico deve ser feito por profissional qualificado."', false, 'Incorreto, essa afirmação é um fato — o diagnóstico é sempre clínico e profissional.')
) as v(texto, correta, feedback);

-- Questão 9 (facil)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('De acordo com pesquisas citadas pela CHADD, qual é aproximadamente a chance de uma criança desenvolver TDAH se um dos pais tem o transtorno?', 'facil', 'CHADD — chadd.org/about-adhd/myths-and-misunderstandings', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('Cerca de 57%', true, 'Correto! Segundo pesquisas citadas pela CHADD (Barkley, 2015), a herdabilidade é de aproximadamente 57% nesse caso.'),
    ('Cerca de 5%', false, 'Incorreto. A porcentagem citada pela CHADD é bem maior, em torno de 57%.'),
    ('100%, é uma certeza', false, 'Incorreto. Não é uma certeza — é uma chance elevada, mas não de 100%.'),
    ('Não há relação genética estabelecida', false, 'Incorreto. A CHADD cita um componente genético relevante e mensurável.')
) as v(texto, correta, feedback);

-- Questão 10 (facil)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('O TDAH ocorre apenas em pessoas com hiperatividade visível?', 'facil', 'CDC — cdc.gov/adhd; DSM-5, American Psychiatric Association', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('Não — existe uma apresentação predominantemente desatenta, sem hiperatividade visível', true, 'Correto! O DSM-5 descreve essa apresentação como uma das três possíveis para o TDAH.'),
    ('Sim — TDAH sempre envolve hiperatividade visível', false, 'Incorreto. Existe uma apresentação predominantemente desatenta, sem hiperatividade evidente.'),
    ('Sim — apenas crianças hiperativas podem ter TDAH', false, 'Incorreto. A apresentação desatenta não envolve hiperatividade visível.'),
    ('Não é possível afirmar nada sobre isso', false, 'Incorreto. O DSM-5 é claro ao descrever essa apresentação predominantemente desatenta.')
) as v(texto, correta, feedback);

-- Questão 11 (medio)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Por que a organização típica de uma sala de aula tradicional pode ser especialmente desafiadora para um estudante com TDAH?', 'medio', 'PAIANO et al., Revista Educação Especial (UFSM), v. 32, 2019', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('Porque exige atenção sustentada por longos períodos, tarefas sequenciais e permanência sentado', true, 'Correto! Esses elementos podem conflitar diretamente com as características do transtorno.'),
    ('Porque salas de aula tradicionais não têm cadeiras confortáveis', false, 'Incorreto. O desafio está relacionado à estrutura de atenção e permanência exigida, não ao conforto físico.'),
    ('Porque o TDAH afeta exclusivamente a visão do estudante', false, 'Incorreto. O TDAH não é um transtorno visual.'),
    ('Não há relação entre a estrutura da sala e o TDAH', false, 'Incorreto. A estrutura tradicional da sala de aula é justamente um dos fatores que tornam o ambiente mais desafiador.')
) as v(texto, correta, feedback);

-- Questão 12 (medio)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Segundo o DSM-5, em quais situações os sinais do TDAH tendem a ficar mínimos ou ausentes?', 'medio', 'DSM-5, American Psychiatric Association', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('Quando a pessoa recebe recompensas frequentes, está sob supervisão, em situação nova, ou em atividade de forte interesse', true, 'Correto! O DSM-5 aponta que os sintomas variam conforme o contexto, ficando menos evidentes nessas situações específicas.'),
    ('Quando a pessoa está sozinha e sem nenhum estímulo', false, 'Incorreto. Essa não é uma das situações apontadas pelo DSM-5 para redução dos sintomas.'),
    ('Os sintomas do TDAH nunca variam conforme o contexto', false, 'Incorreto. O DSM-5 aponta justamente o contrário: há variação conforme o contexto.'),
    ('Apenas durante o sono', false, 'Incorreto. Essa não é uma das situações descritas pelo DSM-5 sobre variação de sintomas.')
) as v(texto, correta, feedback);

-- Questão 13 (medio)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('O que uma revisão sistemática de programas de intervenção escolar para TDAH (Paiano et al., 2019) apontou como fator associado a bons resultados?', 'medio', 'PAIANO et al., Revista Educação Especial (UFSM), v. 32, 2019', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('Identificação precoce e continuidade do suporte ao longo do ano letivo', true, 'Correto! A revisão de Paiano et al. (2019) associou esses dois fatores a melhores resultados dos programas de intervenção.'),
    ('A duração de apenas um bimestre por ano', false, 'Incorreto. O fator associado a bons resultados foi a continuidade ao longo do ano letivo, não um período curto.'),
    ('A ausência total de envolvimento dos professores', false, 'Incorreto. Pelo contrário, o engajamento dos professores como mediadores é relevante para o sucesso dos programas.'),
    ('O uso exclusivo de medicação, sem qualquer suporte escolar', false, 'Incorreto. A revisão trata de programas de intervenção no contexto escolar, não de tratamento medicamentoso.')
) as v(texto, correta, feedback);

-- Questão 14 (medio)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Segundo a revisão de Paiano et al. (2019), qual obstáculo comum pode comprometer os resultados de programas de intervenção escolar para TDAH?', 'medio', 'PAIANO et al., Revista Educação Especial (UFSM), v. 32, 2019', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('A falta de adesão dos professores, que costumam atuar como mediadores dos programas', true, 'Correto! Como grande parte dos programas depende do engajamento dos professores, a falta dessa adesão pode comprometer os resultados.'),
    ('O excesso de recursos financeiros disponíveis para as escolas', false, 'Incorreto. Essa não é uma limitação apontada pela revisão; pelo contrário, faltam recursos, não sobram.'),
    ('A participação excessiva das famílias no processo', false, 'Incorreto. O obstáculo identificado está relacionado à adesão dos professores, não das famílias.'),
    ('A ausência completa de qualquer critério diagnóstico', false, 'Incorreto. O critério diagnóstico não é o obstáculo discutido nessa revisão sobre intervenção escolar.')
) as v(texto, correta, feedback);

-- Questão 15 (medio)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Segundo a CHADD, por que dividir uma tarefa longa em partes menores ajuda um estudante com TDAH?', 'medio', 'CHADD — chadd.org/for-educators/classroom-accommodations', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('Porque permite que o estudante enxergue tanto o início quanto o fim da atividade', true, 'Correto! Essa é a justificativa dada pela CHADD para essa acomodação de sala de aula.'),
    ('Porque reduz a quantidade total de conteúdo que o estudante precisa aprender', false, 'Incorreto. A estratégia não reduz o conteúdo, apenas reorganiza a forma de apresentá-lo.'),
    ('Porque elimina a necessidade de qualquer supervisão do professor', false, 'Incorreto. Essa não é a justificativa dada pela CHADD para essa recomendação.'),
    ('Porque torna a tarefa mais longa e desafiadora', false, 'Incorreto. O objetivo é justamente o oposto: tornar a tarefa mais gerenciável.')
) as v(texto, correta, feedback);

-- Questão 16 (medio)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Qual acomodação de assento a CHADD recomenda para estudantes com TDAH?', 'medio', 'CHADD — chadd.org/for-educators/classroom-accommodations', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('Sentar perto de colegas que sirvam de modelo positivo, e longe de fontes de distração', true, 'Correto! Essa é uma das acomodações recomendadas pela CHADD para ajudar o estudante a manter o foco.'),
    ('Sentar sempre isolado dos demais colegas de turma', false, 'Incorreto. A recomendação é sentar perto de colegas que sirvam de modelo positivo, não isolado.'),
    ('Sentar o mais longe possível do professor', false, 'Incorreto. Essa não é a recomendação da CHADD.'),
    ('A posição do assento não influencia em nada', false, 'Incorreto. A CHADD trata a posição do assento como uma acomodação relevante.')
) as v(texto, correta, feedback);

-- Questão 17 (medio)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('O que caracteriza, segundo a CHADD, uma sala de aula bem administrada para apoiar estudantes com TDAH?', 'medio', 'CHADD — chadd.org/for-educators/classroom-accommodations', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('Regras e rotinas bem estabelecidas, transições suaves entre atividades, e menos elementos visuais distrativos', true, 'Correto! Esses são os elementos que a CHADD associa a uma sala de aula bem administrada.'),
    ('Ausência total de regras, para dar liberdade aos estudantes', false, 'Incorreto. A CHADD recomenda justamente o oposto: regras e rotinas bem estabelecidas.'),
    ('O máximo possível de estímulos visuais na decoração da sala', false, 'Incorreto. A recomendação é reduzir elementos visualmente distrativos, não aumentá-los.'),
    ('Mudanças constantes e imprevisíveis na rotina da turma', false, 'Incorreto. A recomendação é o oposto: rotinas bem estabelecidas e transições suaves.')
) as v(texto, correta, feedback);

-- Questão 18 (medio)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Uma colega de classe diz: "Ele só não presta atenção porque não quer, é falta de educação dos pais." Como essa afirmação deve ser avaliada à luz das fontes citadas pelo site?', 'medio', 'CHADD — chadd.org/about-adhd/myths-and-misunderstandings', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('É um mito — a CHADD aponta fatores genéticos e neurológicos, não sociais, como principais causas do TDAH', true, 'Correto! Reduzir o TDAH à criação dos pais é um dos mitos mais comuns, contrariado pela CHADD.'),
    ('É verdade, já que TDAH é resultado direto da educação recebida em casa', false, 'Incorreto. A CHADD aponta fatores genéticos e neurológicos como as principais causas, não a educação recebida.'),
    ('É parcialmente verdade, dependendo da família', false, 'Incorreto. A base genética e neurológica do transtorno não depende do estilo de criação da família.'),
    ('Não há fontes confiáveis sobre esse assunto', false, 'Incorreto. A CHADD é uma fonte de referência sobre o tema e trata esse ponto especificamente.')
) as v(texto, correta, feedback);

-- Questão 19 (medio)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Um estudante com TDAH consegue se concentrar intensamente enquanto joga seu videogame favorito, mas tem dificuldade de manter atenção em uma aula tradicional. Isso contradiz o diagnóstico de TDAH?', 'medio', 'DSM-5, American Psychiatric Association', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('Não — o DSM-5 aponta que os sintomas podem ficar mínimos em atividades de forte interesse pessoal', true, 'Correto! Essa variação de atenção conforme o contexto é justamente o que o DSM-5 descreve, não uma contradição do diagnóstico.'),
    ('Sim — quem tem TDAH deveria ter dificuldade de concentração em qualquer atividade', false, 'Incorreto. O DSM-5 descreve exatamente o padrão contrário: os sintomas variam conforme o contexto.'),
    ('Sim — isso prova que o estudante está fingindo os sintomas', false, 'Incorreto. Essa interpretação contraria o que o DSM-5 descreve sobre variação de sintomas por contexto.'),
    ('Não é possível interpretar essa situação com as fontes disponíveis', false, 'Incorreto. O DSM-5 aborda exatamente esse tipo de variação de sintomas conforme o contexto.')
) as v(texto, correta, feedback);

-- Questão 20 (medio)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Segundo a CHADD, qual é aproximadamente a chance de um gêmeo desenvolver TDAH se o outro gêmeo tem o transtorno?', 'medio', 'CHADD — chadd.org/about-adhd/myths-and-misunderstandings', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('Entre 70% e 80%', true, 'Correto! Essa é a faixa citada pela CHADD (Barkley, 2015) para gêmeos.'),
    ('Entre 1% e 2%', false, 'Incorreto. A porcentagem citada pela CHADD para gêmeos é bem maior, entre 70% e 80%.'),
    ('Menos de 10%', false, 'Incorreto. A porcentagem citada pela CHADD para gêmeos é bem maior, entre 70% e 80%.'),
    ('Não há dados sobre gêmeos citados pela CHADD', false, 'Incorreto. A CHADD cita especificamente esse dado sobre gêmeos, com base em Barkley (2015).')
) as v(texto, correta, feedback);

-- Questão 21 (dificil)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Uma escola implementa um programa de apoio a estudantes com TDAH, mas o oferece apenas durante um bimestre e depois interrompe. À luz da revisão de Paiano et al. (2019), qual é o problema central dessa abordagem?', 'dificil', 'PAIANO et al., Revista Educação Especial (UFSM), v. 32, 2019', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('A falta de continuidade do suporte ao longo do ano letivo compromete os benefícios observados', true, 'Correto! A revisão associa bons resultados à identificação precoce somada à continuidade do suporte ao longo do ano letivo, não a períodos curtos e isolados.'),
    ('Programas de intervenção escolar nunca trazem qualquer benefício', false, 'Incorreto. A revisão associa benefício à continuidade — o problema é a interrupção, não o programa em si.'),
    ('O problema é exclusivamente a falta de diagnóstico prévio dos estudantes', false, 'Incorreto. Embora a identificação precoce importe, o problema central descrito aqui é a falta de continuidade do suporte.'),
    ('Não há problema, pois um bimestre é tempo suficiente segundo a revisão', false, 'Incorreto. A revisão associa benefício à continuidade ao longo do ano letivo, não a períodos curtos.')
) as v(texto, correta, feedback);

-- Questão 22 (dificil)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Um programa de intervenção escolar para TDAH depende inteiramente dos professores como mediadores das atividades, mas metade deles não participa das reuniões de formação. Com base em Paiano et al. (2019), qual é a implicação mais provável?', 'dificil', 'PAIANO et al., Revista Educação Especial (UFSM), v. 32, 2019', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('Os resultados do programa provavelmente ficarão comprometidos pela baixa adesão dos mediadores', true, 'Correto! A revisão aponta a falta de adesão dos professores, que costumam ser os mediadores dos programas, como um fator que compromete os resultados.'),
    ('Isso não deve afetar em nada os resultados, já que os alunos são o foco do programa', false, 'Incorreto. Como os professores atuam como mediadores, a baixa adesão deles tende a comprometer os resultados.'),
    ('O programa terá resultados ainda melhores com menos professores engajados', false, 'Incorreto. A revisão associa a falta de adesão dos professores a resultados comprometidos, não melhores.'),
    ('Isso só seria um problema se os próprios estudantes também faltassem às aulas', false, 'Incorreto. O fator discutido pela revisão é especificamente a adesão dos professores como mediadores.')
) as v(texto, correta, feedback);

-- Questão 23 (dificil)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Um estudante com TDAH demonstra grande dificuldade de concentração durante uma aula expositiva longa, mas fica profundamente concentrado ao montar um quebra-cabeça complexo por conta própria. Como essa diferença deve ser interpretada à luz do DSM-5?', 'dificil', 'DSM-5, American Psychiatric Association', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('Como uma variação esperada: o DSM-5 aponta que os sintomas podem ficar mínimos em atividades de forte interesse pessoal', true, 'Correto! O DSM-5 descreve exatamente esse padrão de variação de sintomas conforme o contexto e o nível de interesse na atividade.'),
    ('Como evidência de que o estudante não tem TDAH', false, 'Incorreto. Essa variação de atenção conforme o interesse na atividade é compatível com o TDAH, não uma evidência contrária ao diagnóstico.'),
    ('Como prova de que a aula expositiva é o único fator relevante', false, 'Incorreto. O DSM-5 aponta múltiplos fatores contextuais (recompensas, supervisão, novidade, interesse), não apenas o formato da aula.'),
    ('Como algo que o DSM-5 não aborda', false, 'Incorreto. O DSM-5 aborda especificamente a variação de sintomas conforme o contexto.')
) as v(texto, correta, feedback);

-- Questão 24 (dificil)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Uma escola combina duas acomodações recomendadas pela CHADD: divide as tarefas longas em partes menores E reposiciona o estudante com TDAH perto de colegas com comportamento exemplar. Qual objetivo comum essas duas acomodações compartilham?', 'dificil', 'CHADD — chadd.org/for-educators/classroom-accommodations', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('Reduzir a sobrecarga cognitiva e apoiar a manutenção do foco durante as atividades', true, 'Correto! Ambas as acomodações, de formas diferentes, visam tornar as tarefas mais gerenciáveis e apoiar a manutenção da atenção do estudante.'),
    ('Aumentar a dificuldade das tarefas para desafiar mais o estudante', false, 'Incorreto. O objetivo dessas acomodações é o oposto: tornar as tarefas mais gerenciáveis, não mais difíceis.'),
    ('Substituir a necessidade de qualquer outro tipo de apoio pedagógico', false, 'Incorreto. Essas acomodações são um complemento, não uma substituição completa de outras formas de apoio.'),
    ('Isolar completamente o estudante do restante da turma', false, 'Incorreto. A recomendação de assento busca aproximar o estudante de colegas que sirvam de modelo positivo, não isolá-lo.')
) as v(texto, correta, feedback);

-- Questão 25 (dificil)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Um colega afirma: "TDAH é só falta de disciplina em casa — se os pais fossem mais rígidos, o problema desapareceria." Com base nas fontes citadas pelo site, que tipo de evidência contradiz diretamente essa afirmação?', 'dificil', 'CHADD — chadd.org/about-adhd/myths-and-misunderstandings', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('Os fatores genéticos e neurológicos apontados pela CHADD como principais causas do TDAH', true, 'Correto! A CHADD aponta especificamente fatores genéticos e neurológicos — não fatores sociais como a criação — como as principais causas do TDAH.'),
    ('Apenas a opinião pessoal de professores sobre o comportamento em sala', false, 'Incorreto. A contradição vem de evidências científicas (fatores genéticos e neurológicos), não de opiniões pessoais de professores.'),
    ('O fato de que o TDAH afeta exclusivamente crianças de famílias numerosas', false, 'Incorreto. Essa afirmação não corresponde a nenhuma fonte citada pelo site.'),
    ('A ausência total de qualquer pesquisa científica sobre o tema', false, 'Incorreto. Pelo contrário, existem pesquisas específicas (como as citadas pela CHADD) que contradizem essa afirmação.')
) as v(texto, correta, feedback);

-- Questão 26 (dificil)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Considerando os dados de herdabilidade citados pela CHADD (Barkley, 2015) — 57% para filho de pai/mãe com TDAH, e 70%-80% para gêmeos — qual conclusão é mais bem sustentada por esses números?', 'dificil', 'CHADD — chadd.org/about-adhd/myths-and-misunderstandings', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('O componente genético é relevante e parece mais forte entre gêmeos do que entre pais e filhos', true, 'Correto! A diferença entre as porcentagens (57% vs. 70%-80%) sustenta essa conclusão sobre a força do componente genético em diferentes graus de parentesco.'),
    ('Não existe nenhum componente genético relevante no TDAH', false, 'Incorreto. Os números citados demonstram exatamente o contrário: um componente genético relevante.'),
    ('A porcentagem é idêntica em qualquer grau de parentesco', false, 'Incorreto. Os números citados são diferentes entre pais/filhos (57%) e gêmeos (70%-80%).'),
    ('Esses números provam que o ambiente familiar não tem nenhuma influência em nada', false, 'Incorreto. Os dados tratam especificamente de herdabilidade genética, sem descartar outros fatores.')
) as v(texto, correta, feedback);

-- Questão 27 (dificil)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Um estudante apresenta apenas dificuldades de organização e atenção, sem nenhum sinal de agitação motora. Um colega diz que isso não pode ser TDAH "porque TDAH é sempre hiperatividade". Como essa afirmação deve ser avaliada?', 'dificil', 'CDC — cdc.gov/adhd; DSM-5, American Psychiatric Association', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('É incorreta — o DSM-5 descreve uma apresentação predominantemente desatenta, sem hiperatividade evidente', true, 'Correto! Essa é justamente uma das três apresentações descritas pelo DSM-5 para o TDAH.'),
    ('É correta — hiperatividade é obrigatória em todos os casos de TDAH', false, 'Incorreto. O DSM-5 descreve uma apresentação sem hiperatividade evidente como uma das possibilidades.'),
    ('É correta apenas para adultos, mas não para crianças', false, 'Incorreto. A apresentação predominantemente desatenta não é restrita a uma faixa etária específica nas fontes citadas.'),
    ('Não é possível avaliar essa afirmação com as fontes disponíveis', false, 'Incorreto. O DSM-5 trata especificamente das três apresentações possíveis do TDAH.')
) as v(texto, correta, feedback);

-- Questão 28 (dificil)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Uma sala de aula tradicional exige atenção sustentada por longos períodos, tarefas sequenciais e permanência sentado. Combinando esse fato com o que o DSM-5 aponta sobre variação de sintomas por contexto, qual estratégia teria maior potencial de reduzir a manifestação dos sintomas nesse ambiente?', 'dificil', 'DSM-5, American Psychiatric Association', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('Introduzir mais elementos de novidade, supervisão direta e recompensas frequentes durante as atividades', true, 'Correto! Esses são exatamente os fatores que o DSM-5 associa a uma redução na manifestação dos sintomas.'),
    ('Aumentar ainda mais a duração das atividades sentadas e sequenciais', false, 'Incorreto. Isso tende a acentuar, não reduzir, o desafio descrito para estudantes com TDAH nesse contexto.'),
    ('Eliminar toda forma de supervisão durante as atividades', false, 'Incorreto. O DSM-5 associa justamente a supervisão direta a uma redução na manifestação dos sintomas.'),
    ('Não há nenhuma estratégia que possa influenciar a manifestação dos sintomas', false, 'Incorreto. O DSM-5 aponta explicitamente fatores contextuais que influenciam a manifestação dos sintomas.')
) as v(texto, correta, feedback);

-- Questão 29 (dificil)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Uma reportagem afirma que "todo mundo tem um pouco de TDAH às vezes", citando momentos de desatenção pontual como prova. Por que essa generalização é problemática, à luz dos critérios diagnósticos apresentados pelo site?', 'dificil', 'CDC — cdc.gov/adhd; DSM-5, American Psychiatric Association', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('Porque o diagnóstico exige sintomas antes dos 12 anos, em mais de um ambiente, com prejuízo real e persistente — não episódios pontuais', true, 'Correto! Momentos isolados de desatenção não atendem aos critérios diagnósticos completos (idade, múltiplos ambientes, prejuízo real) descritos pelo CDC e pelo DSM-5.'),
    ('Porque desatenção pontual nunca acontece com pessoas sem TDAH', false, 'Incorreto. Episódios pontuais de desatenção podem ocorrer com qualquer pessoa; o que diferencia o TDAH são os critérios diagnósticos completos, não a mera ocorrência de desatenção.'),
    ('Porque o TDAH é definido exclusivamente pela quantidade de sintomas, sem outros critérios', false, 'Incorreto. Os critérios envolvem também idade de início, múltiplos ambientes e prejuízo real, não apenas a presença de sintomas.'),
    ('A generalização não é problemática, pois reflete bem os critérios diagnósticos', false, 'Incorreto. A generalização ignora critérios centrais do diagnóstico, como persistência, múltiplos ambientes e prejuízo real ao funcionamento.')
) as v(texto, correta, feedback);

-- Questão 30 (dificil)
with nova_questao as (
    insert into questoes (enunciado, dificuldade, fonte, ativa)
    values ('Uma escola quer aplicar as acomodações da CHADD, mas decide fazer apenas mudanças estruturais (assento, rotina, divisão de tarefas), sem qualquer identificação precoce ou continuidade ao longo do ano. Cruzando essa prática com Paiano et al. (2019), qual limitação essa abordagem provavelmente terá?', 'dificil', 'PAIANO et al., Revista Educação Especial (UFSM), v. 32, 2019', true)
    returning id
)
insert into alternativas (questao_id, texto, correta, feedback)
select id, texto, correta, feedback from nova_questao, (values
    ('Mesmo com boas acomodações pontuais, a ausência de identificação precoce e continuidade ao longo do ano tende a limitar os benefícios', true, 'Correto! Paiano et al. (2019) associam bons resultados especificamente à combinação de identificação precoce com continuidade do suporte — acomodações pontuais e isoladas não substituem isso.'),
    ('Nenhuma limitação, pois acomodações estruturais isoladas já garantem o mesmo resultado', false, 'Incorreto. A revisão associa bons resultados à continuidade ao longo do ano, não apenas a mudanças estruturais pontuais.'),
    ('A limitação seria a mesma independentemente de haver ou não continuidade do suporte', false, 'Incorreto. A continuidade é justamente um dos fatores que a revisão associa a melhores resultados.'),
    ('Essa abordagem eliminaria totalmente qualquer desafio relacionado ao TDAH na escola', false, 'Incorreto. Nenhuma das fontes citadas sugere que acomodações pontuais eliminam totalmente os desafios.')
) as v(texto, correta, feedback);

