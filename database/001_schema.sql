-- NeuroClass — Schema do banco de dados (PostgreSQL / Supabase)
-- Baseado no Manual Técnico e Científico, Parte V, capítulo 33.
-- Executar no editor SQL do Supabase (ou via CLI de migrações) no ambiente de destino.

create extension if not exists "pgcrypto";

-- usuarios: pessoas que realizam o quiz (nome, e-mail)
create table if not exists usuarios (
    id uuid primary key default gen_random_uuid(),
    nome varchar(120) not null,
    email varchar(160) not null,
    criado_em timestamptz not null default now()
);

create index if not exists idx_usuarios_email on usuarios (email);

-- questoes: banco de perguntas do quiz
create table if not exists questoes (
    id uuid primary key default gen_random_uuid(),
    enunciado text not null,
    dificuldade varchar(10) not null check (dificuldade in ('facil', 'medio', 'dificil')),
    fonte text,
    ativa boolean not null default true
);

create index if not exists idx_questoes_dificuldade_ativa on questoes (dificuldade, ativa);

-- alternativas: opções de resposta de cada questão
create table if not exists alternativas (
    id uuid primary key default gen_random_uuid(),
    questao_id uuid not null references questoes(id) on delete cascade,
    texto text not null,
    correta boolean not null default false,
    feedback text
);

create index if not exists idx_alternativas_questao_id on alternativas (questao_id);

-- tentativas: cada execução do quiz por um usuário
create table if not exists tentativas (
    id uuid primary key default gen_random_uuid(),
    usuario_id uuid not null references usuarios(id) on delete cascade,
    dificuldade varchar(10) not null check (dificuldade in ('facil', 'medio', 'dificil')),
    acertos integer not null default 0,
    erros integer not null default 0,
    percentual numeric(5, 2),
    criado_em timestamptz not null default now(),
    concluida boolean not null default false
);

create index if not exists idx_tentativas_usuario_id on tentativas (usuario_id);

-- respostas: registro de qual alternativa o usuário escolheu em cada questão de uma tentativa
create table if not exists respostas (
    id uuid primary key default gen_random_uuid(),
    tentativa_id uuid not null references tentativas(id) on delete cascade,
    questao_id uuid not null references questoes(id),
    alternativa_id uuid not null references alternativas(id),
    correta boolean not null,
    ordem integer not null
);

create index if not exists idx_respostas_tentativa_id on respostas (tentativa_id);

-- Constraint de integridade adicional: uma resposta por questão dentro da mesma tentativa
create unique index if not exists uq_respostas_tentativa_questao on respostas (tentativa_id, questao_id);

-- ---------------------------------------------------------------------------
-- Row Level Security (Parte V, capítulo 35)
-- Como o acesso a este banco deve ocorrer exclusivamente através do backend
-- (via chave de serviço / service_role, nunca pela chave pública/anon no
-- frontend — RNF01 e RNF04), o RLS é habilitado e nenhuma policy pública é
-- criada. Isso bloqueia qualquer leitura/escrita direta vinda do navegador
-- com a chave anônima, deixando o acesso restrito à chave de serviço usada
-- pelo backend, que ignora RLS por padrão no Supabase.
-- ---------------------------------------------------------------------------

alter table usuarios enable row level security;
alter table questoes enable row level security;
alter table alternativas enable row level security;
alter table tentativas enable row level security;
alter table respostas enable row level security;
