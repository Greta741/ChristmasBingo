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

If PowerShell blocks `npm.ps1`, use `npm.cmd` instead of `npm`; no execution-policy change is needed.

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

Setup steps 01–03 are implemented and awaiting review: the React/TypeScript scaffold, agreed dependencies, strict TypeScript configuration, ESLint, and Prettier. No automated tests or CI/deployment configuration are included.

MUI, Redux Toolkit, redux-persist, React Router, i18next, Zod, and vite-plugin-pwa are installed. Their integration belongs to later steps: routing, the theme, persistence, game features, and PWA registration are not implemented yet.

Local requirements and planning documents are kept in the git-ignored `docs/` directory: [implementation-steps.md](docs/implementation-steps.md), [requirements.md](docs/requirements.md), and [Tech requirements.md](<docs/Tech requirements.md>).

## Dependency review

At setup, `npm audit --omit=dev` reports no vulnerabilities. The full audit reports 15 development-tool vulnerabilities (2 low and 13 moderate), affecting ESLint/PWA dependency chains. Suggested fixes include tool downgrades that change compatibility; no forced fixes or transitive dependency overrides have been applied.
