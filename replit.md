# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### Nafsam (artifacts/nafsam)
Personal memory archive site with dark glassmorphism aesthetics. Frontend-only React+Vite app.
- **Features**: Animated rain, multilingual support (TR/FA/AR/EN), countdown timers, riddle-based login, typed text animation, rotating quotes
- **Pages**: Home, Login, Moments, Photos, Songs, Videos, Writings
- **Tech**: React, Vite, wouter routing, custom CSS (no Tailwind), Inter font
- **Port**: 19579, preview path: /
- **Key files**:
  - `src/i18n/translations.ts` - 4-language translation data
  - `src/hooks/useLang.ts` - Language state with localStorage persistence
  - `src/pages/` - All page components
  - `src/components/` - Rain, TypedText, Navbar, LanguageSwitcher, Footer
  - `public/images/` - hero.png, photo1-3.png
  - `public/media/` - video1.mp4

## Deployment
- **Target**: Autoscale (default) — uses per-artifact configuration from `artifact.toml`
- **Build**: Runs `pnpm install`, then builds both `@workspace/nafsam` and `@workspace/api-server`
- **Nafsam**: Served as static files from `artifacts/nafsam/dist/public`
- **API Server**: Runs via `node --enable-source-maps artifacts/api-server/dist/index.mjs`
- **Health check**: `/api/healthz`

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
