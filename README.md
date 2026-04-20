# CineIQ MV — Music Video Studio

AI-powered creative workspace that transforms an uploaded audio file into a fully production-ready music video package (Seedance / Veo / Kling prompts).

**Standalone product.** Lives alongside CineIQ (drama workstation) but shares no code with it. Reference the sibling `client/` and `server/` for patterns, not for imports.

## Status

Phase 1 — **UI shell + mock data**. All 9 screens clickable, no backend wiring yet.

See roadmap: `docs/roadmap.md` (phased build to production).
PRD source of truth: `docs/prd.md`.

## Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js 16 App Router, React 19, TypeScript 5, Tailwind CSS 4, shadcn/ui |
| State | React hooks + localStorage (Phase 1), API-backed (Phase 2+) |
| Auth | NextAuth 4 + Microsoft Entra ID (same tenant as CineIQ) |
| Backend | FastAPI (Python 3.11+), SQLAlchemy, Alembic |
| DB | PostgreSQL (dedicated `cineiqmv_db`) |
| Vector | Milvus (dedicated collection `cineiqmv_music_video_kb`) |
| LLM | Nebius / NVIDIA Nemotron-120b (not Claude) |
| Audio | librosa, madmom, OpenAI Whisper large-v3 |
| Image gen | Ideogram API (reference frames + style frames) |
| Video tool prompts | Seedance 2 / Veo 3.1 / Kling 2.5 (prompts only; rendering external) |

## Dev setup

### Prerequisites
- Node 20+ with pnpm 9+
- Python 3.11+ with `uv` (or poetry)
- PostgreSQL 16+ running locally (or docker)
- Milvus running locally (or docker)
- Microsoft Entra tenant credentials (for SSO; copy from CineIQ `.env`)

### Client

```bash
cd client
pnpm install
cp .env.example .env.local
# Fill in NEXTAUTH_SECRET + AUTH_MICROSOFT_ENTRA_ID_* values from CineIQ
pnpm dev            # http://localhost:3000
```

### Server (Phase 2+)

```bash
cd server
uv sync
cp .env.example .env
# Fill in DATABASE_URL, MILVUS_URI, NEBIUS_API_KEY, IDEOGRAM_API_KEY, S3_* values
uv run alembic upgrade head
uv run uvicorn main:app --reload        # http://localhost:8000
```

## Running alongside CineIQ

CineIQ also uses ports 3000 / 8000. Run **one at a time**, or change cineiqmv ports via env:

```bash
# cineiqmv on 3001 / 8001
PORT=3001 pnpm dev
UVICORN_PORT=8001 uv run uvicorn main:app --reload --port 8001
```

## Conventions

- Green is the primary brand color — set directly in `globals.css`, not overridden
- Plus Jakarta Sans (sans) + Lora (serif display / KPIs)
- OKLCH tokens only — no arbitrary hex values
- shadcn components in `components/ui/` — use existing, don't reinvent
- Keep pages under 500 lines; extract components freely
- Types in `lib/types.ts`, mocks in `lib/mock-data.ts`
- Every user-action API call MUST be typed via `lib/api.ts`

## Routes

```
/                            Splash → /sign-in or /dashboard
/sign-in                     Microsoft SSO
/dashboard                   Screen 0 — project list + new project
/project/[id]/song           Screen 1 — song intelligence
/project/[id]/concept        Screen 2 — concept ideation
/project/[id]/architecture   Screen 3 — story architecture
/project/[id]/story          Screen 4 — director's treatment
/project/[id]/characters     Screen 5 — character forge
/project/[id]/world          Screen 6 — world builder
/project/[id]/style          Screen 6b — visual style lock
/project/[id]/beats          Screen 7 — beat sheet
/project/[id]/shots          Screen 8 — shot list + prompts
```

## References (read-only, do not import)

- PRD: `docs/prd.md`
- CineIQ patterns: `../client/` and `../server/` — study organization, copy ideas, never import
