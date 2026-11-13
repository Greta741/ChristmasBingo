# Christmas Bingo

Client-side Christmas decoration bingo built with React, TypeScript, and Vite.

OpenAI Codex was used to assist with project planning and development.

## Development environment

- Node.js 24.13.0 LTS, recorded in `.nvmrc`.
- npm 11.6.2, recorded in `package.json`.
- TypeScript 6.0: compatible with the selected typescript-eslint release, which supports TypeScript below 6.1. The scaffold's TypeScript 7 dependency was replaced.

## Getting started

```sh
npm ci
npm run dev
```

Open [localhost:3005](http://localhost:3005/). The development port is fixed; Vite reports an error if it is already occupied.

If PowerShell blocks `npm.ps1`, use `npm.cmd` instead of `npm`; no execution-policy change is needed.

## Base path and navigation

The default base path is `/`. For a repository subpath, copy `.env.example` to `.env.local`, set `VITE_BASE_PATH=/ChristmasBingo/`, and restart Vite or rebuild. This configures asset URLs without changing the hash routes or setting up deployment.

The four page shells are available at `/#/`, `/#/create`, `/#/play/<id>`, and `/#/print`. Print selection parameters belong after the hash route, for example `/#/print?id=a&id=b`.

The logo returns home. Header navigation contains Create, History, and Play. History scrolls to the card list without automatically focusing or highlighting it on the main page. On phones, these actions are available in a right-side slide-out menu. Layout components live under `src/shared/components/layout/`, with compact spacing and a green/gold header.

## Commands

| Command                | Purpose                                                                     |
| ---------------------- | --------------------------------------------------------------------------- |
| `npm run dev`          | Start the development server.                                               |
| `npm run typecheck`    | Check application and Vite configuration types without emitting JavaScript. |
| `npm run lint`         | Run ESLint for React and TypeScript.                                        |
| `npm run format:check` | Check formatting without changing files.                                    |
| `npm run format`       | Format application code and project configuration.                          |
| `npm run build`        | Check types and create the production build in `dist/`.                     |
| `npm run preview`      | Serve the production build locally.                                         |

Prettier excludes the existing requirements/planning documents, generated files, and IDE settings.

## Current scope

Setup steps 01–03 and step 04 are implemented: the React/TypeScript scaffold, agreed dependencies, strict TypeScript configuration, ESLint, Prettier, a shared responsive MUI layout/theme, and four hash-routed page shells. Step 04 is awaiting review. No automated tests or CI/deployment configuration are included.

MUI uses primary colour `#134b38`, with red and gold theme accents and system fonts. Game actions, card generation, persistence, localisation, and PWA registration belong to later steps; Play buttons temporarily navigate to `/play/1`; generation will be connected in the quick-play step. Creation settings and generated-card previews will remain within `/create`.

Local requirements and planning documents are kept in the git-ignored `docs/` directory: [implementation-steps.md](docs/implementation-steps.md), [requirements.md](docs/requirements.md), and [Tech requirements.md](<docs/Tech requirements.md>).

## Dependency review

At setup, `npm audit --omit=dev` reports no vulnerabilities. The full audit reports 15 development-tool vulnerabilities (2 low and 13 moderate), affecting ESLint/PWA dependency chains. Suggested fixes include tool downgrades that change compatibility; no forced fixes or transitive dependency overrides have been applied.
