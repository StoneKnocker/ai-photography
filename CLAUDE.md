# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture Overview

This is an AI music generation platform called "Eleven Music" built with React Router v7 and deployed to Cloudflare Workers. The application allows users to generate music using AI through text prompts.

- **Frontend**: React 19 with TypeScript, TailwindCSS v4, Radix UI components
- **Backend**: Cloudflare Workers with D1 database (SQLite) + R2 storage
- **Routing**: React Router v7 with SSR, file-based routing in `app/routes/`
- **I18n**: Multi-language support via i18next (English, Chinese, Spanish, Japanese, German, French, Korean, Malay)
- **Auth**: Better-auth for authentication with Google OAuth
- **API**: tRPC for type-safe API calls between client/server
- **Music Generation**: Integration with external AI music service (Suno API)

## Key Directories

- `app/` - Main application code
  - `components/` - React components (Radix UI-based design system)
  - `routes/` - React Router routes (file-based routing)
  - `server/` - Server-side code (Cloudflare Workers context)
  - `lib/` - Shared utilities and hooks
  - `locales/` - i18n translations (multiple languages)
- `workers/` - Cloudflare Worker entry point (`app.ts`)
- `posts/` - Markdown content for static pages
- `public/` - Static assets
- `docs/` - Documentation files

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Deploy to Cloudflare Workers
pnpm deploy

# Type checking
pnpm typecheck

# Generate Cloudflare types
pnpm cf-typegen

# Preview production build
pnpm preview
```

## Environment Setup

Required environment variables (see `wrangler.jsonc`):

- `BETTER_AUTH_URL` - Auth service URL
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `R2_*` - Cloudflare R2 storage credentials

Database: Uses Cloudflare D1 (SQLite) with binding `DB`

## I18n Structure

- Routes support `/:locale?` prefix (optional)
- Supported languages: English (en), Chinese (zh), Spanish (es), Japanese (ja), German (de), French (fr), Korean (ko), Malay (ms)
- Translation files in `app/locales/json/`
- Automatic locale detection with cookie-based persistence
- Fallback language: English (en)

## Core Features

### 1. AI Music Generation
- Text-to-music generation using Suno API
- Real-time progress tracking during generation
- Music playback and download capabilities
- Task polling system with timeout handling

### 2. Authentication System
- Google OAuth integration
- User session management
- Database integration for user data

### 3. Database Schema
The application uses several database tables:
- `users` - User accounts and authentication data
- `user_tasks` - User's music generation tasks
- `guest_tasks` - Guest user tasks
- `credit_records` - User credit transactions
- `order` - Payment and order records

### 4. API Architecture
- tRPC for type-safe API calls
- RESTful endpoints for auth and localization
- Integration with external music generation APIs
- Database operations using Kysely query builder

## Routing Structure

The application uses file-based routing with the following structure:
- `/:locale?` - Optional locale prefix
- `/` - Home page with music generation interface
- `/privacy-policy` - Privacy policy page
- `/terms-and-conditions` - Terms and conditions page
- `/api/auth/*` - Authentication endpoints
- `/api/trpc/*` - tRPC endpoints
- `/api/locales` - Localization data
- `/api/kie/callback` - Music generation callback

## UI System

- **Design System**: Shadcn/ui + Radix UI components
- **Styling**: Tailwind CSS v4
- **Theme**: Supports light/dark themes
- **Icons**: Lucide React icons
- **Components**: Reusable UI components in `app/components/ui/`

## Deployment

### Cloudflare Workers Configuration
- Application deployed globally via Cloudflare Workers
- D1 database for persistent storage
- R2 storage for file assets
- Environment-specific configurations (dev/prod)

### Build Process
1. Content collections build for markdown files
2. TypeScript compilation
3. Vite build for production assets
4. Cloudflare Workers deployment

## Testing

- Test files located in `tests/` directory
- Music API testing script available
- No formal test framework configured

## Important Notes

- The application automatically redirects `/en/` URLs to root paths
- Music generation uses external API with polling mechanism
- Guest users can generate music without authentication
- User credits system for limiting usage
- Analytics integration (Google Analytics, Plausible, Clarity)