# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Installation
```bash
pnpm install
```

### Development
```bash
pnpm dev              # Start dev server at http://localhost:3000
pnpm typecheck        # Run TypeScript type checking
```

### Build & Deploy
```bash
pnpm build            # Build production version
pnpm deploy           # Build and deploy to Cloudflare Workers
```

### Testing
```bash
node tests/test-music-api.js  # Run API tests (requires wrangler dev)
```

## Architecture Overview

This is a full-stack React Router v7 application deployed to Cloudflare Workers.

### Tech Stack
- **Frontend**: React 19 + TypeScript + Tailwind CSS v4 + Radix UI (Shadcn/ui)
- **Backend**: Cloudflare Workers with D1 Database (SQLite)
- **Routing**: React Router v7 with SSR enabled
- **API**: tRPC for type-safe API calls
- **Auth**: Better-auth with Google OAuth
- **I18n**: i18next with English/Spanish support
- **Content**: Markdown via content-collections

### Directory Structure
```
app/                    # Main application code
  ├── components/       # React components
  │   └── ui/          # Shadcn UI components (Radix UI wrapper)
  ├── routes/          # React Router routes (file-based)
  │   ├── api/         # API endpoints (auth, trpc, locales)
  │   └── support-pages/  # Static pages (privacy, terms)
  ├── server/          # Server-side code
  │   ├── db/          # Database schemas and queries (Kysely)
  │   ├── trpc/        # tRPC configuration
  │   └── *.server.ts  # Server utilities (auth, i18n, cf context)
  ├── lib/             # Client-side utilities and hooks
  │   ├── auth-client.ts
  │   ├── trpc-client.ts
  │   └── utils.ts
  └── locales/         # i18n translations
workers/               # Cloudflare Worker entry (app.ts)
posts/                 # Markdown content
public/                # Static assets
```

### Key Architecture Patterns

1. **Full-stack Type Safety**: Database (Kysely) → tRPC API → React components, all fully typed
2. **Optional Locale Routes**: `/:locale?` prefix pattern for i18n routes
3. **Server/Client Separation**: Files ending in `.server.ts` only run on server
4. **Edge Runtime**: Runs on Cloudflare Workers (no Node.js APIs)
5. **File-based Routing**: React Router v7 route configuration in `app/routes.ts`

### Route Configuration

Main routes defined in `app/routes.ts`:
- `/:locale?/...` - All user-facing routes support optional locale prefix
  - `/` - Homepage
  - `/privacy-policy` - Privacy policy page
  - `/terms-and-conditions` - Terms and conditions
- `/api/auth/*` - Better-auth endpoints
- `/api/trpc/*` - tRPC API endpoints
- `/api/locales` - i18n resources API

### Database Access

- Access D1 database via `context.cloudflare.env.DB` in route loaders/actions
- Use Kysely ORM for type-safe queries
- Database binding is "DB" (configured in `wrangler.jsonc`)

### Environment Variables

Required environment variables (see `wrangler.jsonc`):
- `BETTER_AUTH_URL` - Auth service URL
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `R2_*` - Cloudflare R2 storage credentials (for media uploads)

Local development uses Cloudflare dev env with real D1 database binding.

### Adding New Features

1. **New Routes**: Add file to `app/routes/` and register in `app/routes.ts`
2. **New UI Components**: Create in `app/components/` (use `app/components/ui/` for Shadcn components)
3. **New API Endpoints**: Add tRPC procedure in `app/server/trpc/` or create route in `app/routes/api/`
4. **Database Changes**: Update schema in `app/server/db/schema.ts` and run migrations on D1
5. **New Translations**: Add keys to translation files in `app/locales/json/`

### Important Notes

- SSR is enabled - check for browser-only APIs in components
- Uses pnpm for package management (not npm/yarn)
- Port 3000 for dev server (configured in `vite.config.ts`)
- Content collections require rebuild when markdown changes
- TypeScript project references used (see `tsconfig.json`)
