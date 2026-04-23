# Threat Model

## Project Overview

This project is a pnpm-workspace TypeScript monorepo for a personal memory archive called Nafsam. Production consists of a React + Vite frontend in `artifacts/nafsam` and an Express 5 server in `artifacts/api-server` that serves `/api` and, in the API deployment, the built frontend assets. The application appears intended to present private or semi-private personal photos, videos, writings, and related text content behind a riddle-style login experience.

Production assumptions for future scans:
- `NODE_ENV` is `production` in deployed environments.
- Platform TLS is managed by the deployment platform.
- `artifacts/mockup-sandbox` is development-only and should be ignored unless production reachability is demonstrated.

## Assets

- **Private memory content** -- personal photos, videos, writings, captions, and other intimate media under `artifacts/nafsam/public/`. Exposure would disclose sensitive personal content to unauthorized viewers.
- **Access-control secrets and session state** -- any riddle answers, future passwords, cookies, or session markers that gate access to private pages or media. Compromise would let attackers impersonate authorized viewers.
- **Application and infrastructure secrets** -- environment variables such as `DATABASE_URL`, any future API keys, and deployment configuration. Exposure would allow backend or data-store compromise.
- **Integrity of presented content** -- the app’s text, captions, and media sequencing. Client-controlled state must not be treated as proof of authorization for protected content.

## Trust Boundaries

- **Browser to server boundary** -- all frontend route access, static asset fetches, and `/api` requests cross from an untrusted browser into deployed services. The client must be treated as fully attacker-controlled.
- **Public to intended-private content boundary** -- the app distinguishes a login page from private pages such as `/home`, `/photos`, `/videos`, `/moments`, `/songs`, `/writings`, and `/stats`. This boundary only matters if it is enforced server-side, including for underlying media files.
- **Server to database boundary** -- `lib/db` provisions a PostgreSQL client via `DATABASE_URL`. Even if currently unused by routes, future API handlers on this boundary must assume database access is highly privileged.
- **Production to dev-only boundary** -- `artifacts/mockup-sandbox`, `scripts/`, and codegen/spec tooling are not production surfaces unless explicitly wired into deployment.

## Scan Anchors

- **Production entry points**: `artifacts/api-server/src/index.ts`, `artifacts/api-server/src/app.ts`, `artifacts/nafsam/src/App.tsx`
- **Highest-risk code areas**: `artifacts/nafsam/src/pages/Login.tsx`, `artifacts/nafsam/src/App.tsx`, `artifacts/nafsam/src/pages/Photos.tsx`, `artifacts/nafsam/src/pages/Videos.tsx`, `artifacts/nafsam/public/`, `artifacts/api-server/src/routes/`
- **Public surfaces**: `/api/healthz`, static assets under the deployed frontend build, and any direct file paths under `/images`, `/media`, or similar public directories
- **Intended authenticated surfaces**: frontend routes gated by the app’s login flow (`/home`, `/moments`, `/photos`, `/songs`, `/videos`, `/writings`, `/stats`)
- **Dev-only areas to usually ignore**: `artifacts/mockup-sandbox/`, `scripts/`, `lib/api-spec/`

## Threat Categories

### Spoofing

If the site is meant to restrict access to private memories, the server must authenticate viewers with a secret that is not shipped to the browser and must validate that proof on every protected request. Client-side markers such as `localStorage` flags, route guards, or hardcoded answers do not establish identity because any visitor can modify browser state and inspect bundled code.

### Tampering

The client is untrusted and can freely alter route state, local storage, DOM state, and request parameters. Any decision about whether a viewer may see restricted content or fetch restricted files must be enforced by server-side checks, not by frontend-only logic or by hiding links in the UI.

### Information Disclosure

Private media, writings, and captions must not be exposed as publicly retrievable static assets if they are intended to be access-controlled. The application must avoid embedding sensitive answers or other gatekeeping secrets in shipped JavaScript, and API responses or logs must not disclose secrets or personal data beyond what an authorized viewer needs.

### Elevation of Privilege

A visitor must not be able to promote themselves from unauthenticated to authenticated simply by changing client-side state, directly requesting asset URLs, or navigating to hidden routes. Any future backend endpoints that expose user or memory data must enforce authorization server-side and must not rely on the frontend to pre-filter access.
