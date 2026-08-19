# NeuroClass

Plataforma educativa sobre TDAH (Transtorno do Déficit de Atenção e Hiperatividade), com
conteúdo com base científica e um quiz interativo de conhecimento em três níveis de
dificuldade.

Projeto de TCC — Técnico em Informática para Internet, Etec Albert Einstein, 2026.

> ⚠️ **Importante:** o NeuroClass tem finalidade exclusivamente educativa. Ele **não**
> realiza diagnóstico de TDAH. O diagnóstico deve sempre ser feito por um profissional de
> saúde qualificado.

## Arquitetura

```
neuroclass/
├── database/     # Schema SQL (Supabase/PostgreSQL) e seed do banco de questões
├── backend/      # API em Python (FastAPI)
└── frontend/     # SPA em React + Vite
```

- **Frontend:** React 18 + Vite + React Router, consumindo a API via `fetch`.
- **Backend:** FastAPI, responsável por toda a lógica de negócio do quiz (sorteio de
  questões, correção, pontuação) — a resposta correta nunca é exposta ao frontend antes de
  o usuário responder.
- **Banco de dados:** PostgreSQL via Supabase, acessado **apenas** pelo backend (chave de
  serviço), nunca diretamente pelo frontend.
- **E-mail:** envio do resultado do quiz via [Resend](https://resend.com), disparado pelo
  backend ao final de cada tentativa.

## Rodando localmente

### 1. Banco de dados (Supabase)

1. Crie um projeto em [supabase.com](https://supabase.com).
2. No editor SQL do projeto, execute nesta ordem:
   - `database/001_schema.sql`
   - `database/003_gabarito.sql`
   - `database/002_seed_questoes.sql`
3. Copie a **Project URL** e a **service_role key** (Settings → API) — serão usadas apenas
   pelo backend.

### 2. Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env       # preencha SUPABASE_URL, SUPABASE_KEY, EMAIL_API_KEY etc.
uvicorn app.main:app --reload
```

A API sobe em `http://localhost:8000`. Documentação interativa em `/docs`.

### 3. Frontend

```bash
cd frontend
npm install
cp .env.example .env.local  # ajuste VITE_API_URL se necessário
npm run dev
```

A aplicação sobe em `http://localhost:5173`.

## Deploy em produção

Conforme a Parte IX do manual técnico do projeto:

| Camada     | Serviço   |
| ---------- | --------- |
| Frontend   | Vercel    |
| Backend    | Railway   |
| Banco      | Supabase  |
| E-mail     | Resend    |

Passos gerais:

1. **Supabase:** já configurado nos passos locais acima; use o mesmo projeto em produção.
2. **Backend (Railway):** crie um serviço apontando para a pasta `backend/`, configure as
   variáveis de ambiente de `backend/.env.example` no painel do Railway (nunca no código),
   e defina `CORS_ORIGIN` com o domínio final do frontend na Vercel.
3. **Frontend (Vercel):** crie um projeto apontando para a pasta `frontend/`, com
   `VITE_API_URL` apontando para a URL pública do backend no Railway.
4. **Resend:** valide um domínio de envio (ou use o domínio de testes do Resend) e gere a
   `EMAIL_API_KEY` usada pelo backend.

## Regras de negócio centrais (resumo)

- Cada tentativa de quiz tem exatamente **10 questões**, cada uma com **4 alternativas**.
- A ordem das questões e das alternativas é sorteada a cada nova tentativa.
- A alternativa correta de cada questão só é revelada ao frontend **depois** que o usuário
  responde àquela questão específica — nunca antes.
- O resultado do quiz nunca sugere ou insinua diagnóstico de TDAH.
- São coletados apenas nome e e-mail do usuário, usados exclusivamente para identificar o
  resultado e enviá-lo por e-mail (LGPD).

## Equipe

Projeto conduzido por Luiz, com Julia Cristina, Eduarda Carcamo e Kauã Lacerda — 3º Infonet,
Etec Albert Einstein.
