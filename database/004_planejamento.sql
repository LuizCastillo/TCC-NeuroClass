-- NeuroClass — Migração: Ferramentas para o dia a dia (planejamento de rotina)
--
-- Contexto: substitui a antiga área de vídeo institucional com a psicóloga
-- por uma ferramenta própria de organização e rotina escolar. Não há
-- sistema de login/senha no projeto — o "usuário" é identificado da mesma
-- forma que no quiz (nome + e-mail, tabela usuarios), então as tarefas são
-- associadas a usuario_id, e o backend sempre filtra por esse campo antes
-- de retornar ou modificar qualquer tarefa.

create table if not exists tarefas (
    id uuid primary key default gen_random_uuid(),
    usuario_id uuid not null references usuarios(id) on delete cascade,
    titulo varchar(120) not null,
    descricao text,
    data date not null,
    horario time,
    duracao_minutos integer,
    prioridade varchar(6) not null default 'media' check (prioridade in ('baixa', 'media', 'alta')),
    categoria varchar(20) not null default 'outros'
        check (categoria in ('estudos', 'trabalhos', 'escola', 'leitura', 'projetos', 'outros')),
    concluida boolean not null default false,
    criado_em timestamptz not null default now(),
    atualizado_em timestamptz not null default now()
);

create index if not exists idx_tarefas_usuario_data on tarefas (usuario_id, data);

create table if not exists subtarefas (
    id uuid primary key default gen_random_uuid(),
    tarefa_id uuid not null references tarefas(id) on delete cascade,
    titulo varchar(160) not null,
    concluida boolean not null default false,
    ordem integer not null default 0,
    criado_em timestamptz not null default now()
);

create index if not exists idx_subtarefas_tarefa_id on subtarefas (tarefa_id, ordem);

-- Mesma política de RLS do restante do projeto: habilitado, sem policies
-- públicas — o acesso ocorre exclusivamente via backend (chave de serviço).
alter table tarefas enable row level security;
alter table subtarefas enable row level security;
