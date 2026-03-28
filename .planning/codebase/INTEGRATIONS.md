# External Integrations

**Analysis Date:** 2026-03-28

## APIs & External Services

**Hosting/Deployment:**
- Vercel - Deployment/hosting referenced in `README.md` and `MAINTAINANCE-AND-SUPPORT.md`
  - Config files: Not detected (`vercel.json` not present at repo root)

**Fonts:**
- Google Fonts - Loaded via CSS `@import` in `src/index.css`

## Data Storage

**Databases:**
- Not detected (no database client/ORM dependencies in `package.json`, no API/data-fetching code detected in `src/`)

**File Storage:**
- Local static assets only (images/SVGs under `src/assets/**`)

**Caching:**
- None detected (no caching client dependencies; no service worker detected)

## Authentication & Identity

**Auth Provider:**
- None detected (no auth SDK dependencies; no auth flows in `src/`)

## Monitoring & Observability

**Error Tracking:**
- None detected (no Sentry/Datadog/etc. dependencies; no instrumentation code detected)

**Logs:**
- Console logging present in UI code (`src/components/Projects.tsx`)

## CI/CD & Deployment

**Hosting:**
- Vercel (referenced in `README.md`, `MAINTAINANCE-AND-SUPPORT.md`)

**CI Pipeline:**
- Not detected (no `.github/` directory at repo root; no CI config files detected)

## Environment Configuration

**Required env vars:**
- None detected (no `.env*` files and no `import.meta.env`/`process.env` usage found)

**Secrets location:**
- Not applicable (no secrets/config files detected in repository)

## Webhooks & Callbacks

**Incoming:**
- None (static client-side SPA)

**Outgoing:**
- None detected (no API calls; no external SDKs beyond UI/i18n/tooling)

---

*Integration audit: 2026-03-28*

