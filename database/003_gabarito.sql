-- NeuroClass — Migração complementar: coluna de gabarito da tentativa
--
-- Contexto (Manual, Parte IV, capítulo 29 e Parte VIII, capítulos 54-55):
-- ao iniciar uma tentativa, o backend sorteia a ordem das 10 questões e das
-- alternativas de cada uma, e precisa fixar essa ordem (junto com qual
-- alternativa é a correta de cada questão) até o fim da tentativa — sem
-- nunca expor essa informação ao frontend antes da resposta do usuário.
--
-- Esta coluna jsonb guarda exatamente essa "chave" da tentativa no servidor.
-- Ela nunca é lida por nenhuma rota pública sem passar pela lógica de
-- correção do backend (app/services/quiz_service.py).

alter table tentativas
    add column if not exists gabarito jsonb;

comment on column tentativas.gabarito is
    'Ordem sorteada de questões/alternativas e gabarito da tentativa. Uso interno do backend apenas — nunca exposto diretamente ao frontend.';
