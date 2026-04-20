# CineIQ MV — Claude / AI Agent Instructions

## What this codebase is
Standalone **Music Video Studio** for Hungama. Takes an audio file → 8-step AI pipeline → Seedance / Veo / Kling-ready prompts. Lives at `CineIQ/cineiqmv/`, separate from the sibling CineIQ drama workstation.

**Never import from `../client/` or `../server/`.** Those are CineIQ. If you need a pattern, copy the code into this codebase.

## Current phase
Phase 1 — UI shell + mock data. No backend yet. All data from `lib/mock-data.ts`.

Roadmap: `docs/roadmap.md`. PRD: `docs/prd.md`.

## Tech stack
- Next.js 16 App Router, React 19, TypeScript 5 (strict)
- Tailwind CSS 4 (OKLCH tokens via `@theme` in `globals.css` — no arbitrary hex)
- shadcn/ui (New York style, Neutral base, **Green primary**)
- Radix UI primitives
- Plus Jakarta Sans (body) + Lora (serif display, KPI numbers)
- Framer Motion 12 (page transitions)
- Recharts (charts)
- Sonner (toasts)
- NextAuth 4 + Microsoft Entra ID (shared tenant with CineIQ)
- pnpm package manager

Backend (Phase 2+): FastAPI + SQLAlchemy + Alembic, PostgreSQL, Milvus, librosa, Whisper, Nebius/Nemotron, Ideogram.

## Behavioral rules
- Do what has been asked; nothing more, nothing less
- NEVER create files unless absolutely necessary
- ALWAYS prefer editing an existing file to creating a new one
- NEVER proactively create documentation files (*.md) unless asked
- ALWAYS read a file before editing it
- NEVER commit secrets, credentials, or .env files

## Design language
- **Primary accent: green** `oklch(0.60 0.17 152)` light / `oklch(0.72 0.18 152)` dark
- Premium editorial tool aesthetic (Stripe / Filament-inspired) — NOT SaaS CRM
- Body: 14px / 1.6 line-height / antialiased
- Buttons: `font-semibold`, `h-10 px-5 py-2.5`
- Cards: `shadow-md`, bold CardTitle (`text-lg font-bold`)
- Badges: `text-[12px] font-semibold`, `px-2.5 py-1`
- Font-size floor: minimum `text-[11px]`, prefer `text-xs` (12px)+
- Headers/titles: `font-semibold` or `font-bold` (never `font-medium`)
- `font-serif` (Lora) for hero headings, KPI numbers, AI output display
- `font-sans` (Plus Jakarta) for UI, nav, form fields, body
- Sidebar: warm charcoal (`oklch(0.16 0.008 260)`) with light text
- Generous whitespace: `gap-12+` between major sections, `p-8` card padding
- No icon-in-circle decorators. No purple gradients. No Inter / Arial.

## Tailwind v4 pattern
- `@theme { --color-X: light-value; }` for tokens
- `@layer base { .dark { --color-X: dark-value; } }` for dark mode
- NEVER use `@theme inline` — it bakes values at build time, breaks runtime var lookup

## File organization
- `/app` — Next.js App Router routes
- `/components` — reusable React components (ui/ = shadcn primitives)
- `/lib` — types, mock data, utils, API client
- `/public` — static assets
- NEVER save files to the repo root (use `/docs` for markdown, `/scripts` for utils)

## Shared patterns
- **Inline editing**: `hover:ring-1 hover:ring-accent/40` hover cue → click → input/textarea → blur saves
- **Regeneration**: `RegenerateBar` with guidance textarea + Cmd+Enter; fake 1.5s delay
- **Version history**: `GenerationHistoryPopover<T>` triggered by version badge
- **Streaming text**: `StreamingText` — 12ms/char reveal with blinking cursor
- **Auto-save**: `AutosaveIndicator` — saving / saved / offline states

## Routing
```
/                            Splash → /sign-in or /dashboard
/sign-in                     Microsoft SSO
/dashboard                   Project list + new project CTA
/project/[id]/{step}         where step ∈ song|concept|architecture|story|characters|world|style|beats|shots
```

## Types & mocks
- `lib/types.ts` — full PRD schema as TS interfaces (MVProject, SongMetadata, ConceptCard, ..., Shot)
- `lib/mock-data.ts` — `mvMockProjects`, `mvMockSongMetadata`, etc.
- `lib/steps.ts` — 9-step definitions + navigation helpers
- `lib/resolve-project.ts` — project lookup (Phase 1: mock, Phase 2: API)

## Concurrency
- ALWAYS batch parallel operations in a single message
- ALWAYS batch file reads/writes/edits in ONE message when independent
- Use Agent tool for complex multi-step work

## Security
- NEVER hardcode API keys or secrets
- Validate user input at system boundaries
- Sanitize file paths to prevent directory traversal
