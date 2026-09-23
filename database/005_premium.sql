-- NeuroClass — Migração: plano premium (simulado), exportação de calendário e tema
--
-- Contexto: modelo freemium para as ferramentas de organização/rotina.
-- IMPORTANTE: nesta fase, o "premium" é uma SIMULAÇÃO para fins de TCC —
-- não há processador de pagamento real integrado, nenhuma cobrança
-- acontece de fato. Ver app/services/assinatura_service.py.

alter table usuarios
    add column if not exists plano varchar(10) not null default 'gratuito'
        check (plano in ('gratuito', 'premium'));

alter table usuarios
    add column if not exists plano_atualizado_em timestamptz;

alter table usuarios
    add column if not exists tema varchar(20) not null default 'azul'
        check (tema in ('azul', 'verde', 'roxo', 'laranja'));

-- Token secreto usado no link de assinatura de calendário (.ics). Gerado
-- sob demanda quando o usuário premium ativa a exportação pela primeira
-- vez. Funciona como uma "senha de URL": quem tiver o link enxerga as
-- tarefas daquele usuário em formato de calendário, então o token é
-- longo e pode ser regenerado a qualquer momento pelo próprio usuário.
alter table usuarios
    add column if not exists token_calendario uuid;

create unique index if not exists idx_usuarios_token_calendario on usuarios (token_calendario);
