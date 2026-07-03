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

- `apps/web` and `apps/docs` — **empty directories** (Next.js apps, not yet initialized).
- `packages/ui` (`@repo/ui`) — React component library. Exports `./*` → `./src/*.tsx`. Components use `"use client"`. Lint: `eslint . --max-warnings 0`.
- `packages/eslint-config` (`@repo/eslint-config`) — ESLint flat configs (ESM): `base`, `next-js`, `react-internal`.
- `packages/typescript-config` (`@repo/typescript-config`) — Shared tsconfigs: `base.json`, `nextjs.json`, `react-library.json`.

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
