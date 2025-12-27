# Spammerino

Modern Angular 21 application with a generated OpenAPI client, Spartan NG UI components, Tailwind CSS, and Vitest for unit testing. The app is built with pnpm and the Angular CLI, and includes a library for consuming the Spammerino API.

## Tech Stack

- Angular 21 (CLI and build system)
- pnpm 9 (package manager)
- Tailwind CSS 4 + PostCSS
- Spartan NG (brain/helm) component primitives
- ng-icons (Lucide icons)
- Vitest (Angular CLI unit-test builder)
- OpenAPI client generation via ng-openapi

## Prerequisites

- Node.js 18+ or 20+
- pnpm installed globally (version ~9)

## Getting Started

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm start
```

Open http://localhost:4200/ in your browser. The server reloads on file changes.

## Scripts

- `pnpm start` – run the dev server
- `pnpm build` – production build to `dist/`
- `pnpm test` – run unit tests with Vitest
- `pnpm watch` – development build in watch mode

## Project Structure

- Application: `src/` (entry: `src/main.ts`, global styles: `src/styles.css`, static assets: `public/`)
- API Library: `projects/api` (generated client, models, services)
- UI Library: `projects/ui` (design system directives/components built on Spartan NG)
- Configuration: `angular.json` for build/serve targets, `tsconfig.*.json` for TypeScript

## API Client

The API client in `projects/api` is generated from an OpenAPI spec and exposed as an Angular library.

- Spec location: `projects/api/swagger.json`
- Generator config: `projects/api/openapi.config.ts`
- Default base path token: `BASE_PATH_SPAMMERINOAPI` (defaults to `/api`)

Regenerate the client:

```bash
cd projects/api
pnpm fetch:spec          # fetch latest OpenAPI spec
pnpm generate:client     # clean and regenerate the client
```

If you don’t have ng-openapi installed locally, you can also run:

```bash
pnpm dlx ng-openapi -c openapi.config.ts
```

Override the API base URL in your app (e.g., in a bootstrapping module/provider):

```ts
import { BASE_PATH_SPAMMERINOAPI } from '@api';
providers: [{ provide: BASE_PATH_SPAMMERINOAPI, useValue: 'https://spammerino-api.vercel.app' }];
```

## UI & Styling

- Tailwind CSS v4 is enabled via PostCSS; global styles in `src/styles.css`.
- Spartan NG (brain and helm) provides accessible primitives and utility directives used across `projects/ui`.
- Lucide icons via `@ng-icons/lucide`.

## Building

Create a production build:

```bash
pnpm build
```

Artifacts are output to `dist/`. Production builds enable optimization and output hashing.

## Testing

Run unit tests:

```bash
pnpm test
```

Vitest is configured via the Angular CLI unit-test builder. Type definitions are wired through `tsconfig.spec.json`.

## Notes

- End-to-end testing is not preconfigured. Choose and set up your preferred e2e framework as needed.
- The workspace uses pnpm as the package manager.

## Useful References

- Angular CLI project configuration: `angular.json`
- API client tokens and providers: `projects/api/src/lib/tokens/index.ts`, `projects/api/src/lib/providers.ts`
- OpenAPI generator config: `projects/api/openapi.config.ts`
