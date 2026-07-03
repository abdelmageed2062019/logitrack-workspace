# Logitrack Workspace — Agent Guide

## Package manager

- **pnpm@9.0.0** — never use npm or yarn. Add deps with `pnpm add <pkg>`, workspace deps with `pnpm add <pkg> --filter <target>`.

## Turbo monorepo

All root scripts delegate to turbo (`turbo.json`):

| Command | Effect |
|---|---|
| `pnpm build` | `turbo run build` — builds all packages/apps (depends-on `^build`) |
| `pnpm dev` | `turbo run dev` — persistent dev servers, no cache |
| `pnpm lint` | `turbo run lint` — depends-on `^lint` |
| `pnpm check-types` | `turbo run check-types` — depends-on `^check-types` |
| `pnpm format` | `prettier --write "**/*.{ts,tsx,md}"` |

Filter to a single target: `pnpm build --filter=@repo/ui`

## Workspace layout

- `apps/host-portal` — **main host** (Next.js, port 3000). Acts as micro-frontend shell; rewrites remote requests via `next.config.ts`.
- `apps/fleet-tracking` — **remote** (Next.js, port 3001). Asset prefix: `/fleet-assets`.
- `apps/smart-warehouse` — **remote** (Next.js, port 3002). Asset prefix: `/warehouse-assets`.
- `apps/analytics-dashboard` — **remote** (Next.js, port 3003). Asset prefix: `/analytics-assets`.
- `packages/ui` (`@repo/ui`) — React component library. Exports `./*` → `./src/*.tsx`. Components use `"use client"`. Uses ShadCN-style components with `class-variance-authority` + `clsx` + `tailwind-merge`. Lint: `eslint . --max-warnings 0`.
- `packages/tailwind-config` (`@repo/tailwind-config`) — Shared Tailwind config with brand colors (`brand.dark`, `brand.primary`, `brand.accent`, `brand.success`). Used as a `presets` entry in each app's `tailwind.config.ts`.
- `packages/eslint-config` (`@repo/eslint-config`) — ESLint flat configs (ESM): `base`, `next-js`, `react-internal`.
- `packages/typescript-config` (`@repo/typescript-config`) — Shared tsconfigs: `base.json`, `nextjs.json`, `react-library.json`.

## Micro-frontend setup

- **Host** (`host-portal`) uses `next.config.ts` `rewrites()` to proxy asset requests (`/fleet-assets/_next/*`, etc.) and page routes (`/fleet/*`, `/warehouse/*`, `/analytics/*`) to the correct remote port.
- Each remote app sets `assetPrefix` and a matching rewrite in its own `next.config.ts` so assets resolve correctly when served through the host.

## TypeScript quirks

- **`base.json`**: `module: NodeNext`, `moduleResolution: NodeNext` — import extensions are **required** (`./foo.js` not `./foo`).
- `strict: true`, `target: ES2022`.
- `react-library.json` adds `jsx: react-jsx`. `nextjs.json` uses `module: ESNext` + `moduleResolution: Bundler`.

## Linting

- ESLint v9 **flat config** (`.mjs`/`.js` ESM files, no `.eslintrc`).
- `@repo/eslint-config/base` bundles: `@eslint/js` recommended, Prettier compat, `typescript-eslint` recommended, `turbo/no-undeclared-env-vars` (warn), `only-warn`.
- `@repo/ui` runs `eslint . --max-warnings 0` — zero warnings allowed.

## Prettier

No config file — uses `prettier@3.7.4` defaults. Run via root `pnpm format`.

## Notable gaps

- No CI/CD workflows (`.github/` absent).
- No pre-commit hooks or commit linting.
- No `.env.example` — env files are in `.gitignore`.
