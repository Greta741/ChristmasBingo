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

## GitHub Pages

The workflow in `.github/workflows/deploy-pages.yml` builds and deploys the site on every push to `main`. It can also be started manually from Actions → Deploy to GitHub Pages → Run workflow.

One-time setup:

1. Open [repository Pages settings](https://github.com/Greta741/ChristmasBingo/settings/pages).
2. Under **Build and deployment → Source**, select **GitHub Actions**.
3. Commit and push the project, including the workflow and `package-lock.json`, to `main`.
4. Wait for **Deploy to GitHub Pages** to finish in the repository's Actions tab.

The published address is **https://greta741.github.io/ChristmasBingo/**. For example, Create opens at `https://greta741.github.io/ChristmasBingo/create`.

The workflow uses the Node version from `.nvmrc`, runs `npm ci`, ESLint and the production build, and uploads only `dist/`. Vite's base path is taken from GitHub Pages metadata, including `/ChristmasBingo/` for the repository site. Browser routing uses clean URLs without hashes. The deployment workflow also copies the app entry document to `dist/404.html`, so GitHub Pages can load the application on direct links and refreshes. GitHub serves that fallback with HTTP status 404, but the app renders the requested route without changing its URL. No personal access token or additional deploy dependency is needed.

To preview the same subpath locally in PowerShell:

```powershell
$env:VITE_BASE_PATH = '/ChristmasBingo/'
npm.cmd run build
npm.cmd run preview -- --base=/ChristmasBingo/
```

Open `http://localhost:4173/ChristmasBingo/`. Remove the environment override afterward with `Remove-Item Env:VITE_BASE_PATH`.

Cards and custom decorations are stored in the visitor's browser (IndexedDB/localStorage); publishing does not upload them to GitHub or transfer development data to the published site.

## Base path and navigation (local development)

The default base path is `/`. For a repository subpath, copy `.env.example` to `.env.local`, set `VITE_BASE_PATH=/ChristmasBingo/`, and restart Vite or rebuild. Deployment automatically sets the correct base path through the workflow.

The four routes are available at `/`, `/create`, `/play/<id>`, and `/print`. Print selection uses comma-separated IDs, for example `/print?ids=a,b,c,d`; only the first four IDs are loaded. It opens without the app header/footer and lays out unmarked cards in a 2 × 2 A4 sheet. Use the browser's Print command (Ctrl+P) to print it. Production routes include the base path: `/ChristmasBingo/play/<id>`.

The logo returns home. Header navigation contains Create, History, and Play. History opens `/?section=history` without the home hero. On phones, these actions are available in a right-side slide-out menu. Layout components live under `src/components/layout/`, with compact spacing and a green/gold header.

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

The app supports card generation, IndexedDB storage, paginated history, card deletion, play with persistent cell marking and Bingo celebrations, LT/EN localisation, and custom decoration management. GitHub Pages deployment is configured through GitHub Actions. Print functionality and PWA registration remain unfinished.

MUI uses primary colour `#134b38`, with red and gold theme accents and system fonts. Individual card Play buttons open their saved `/play/<id>` routes. The home hero Play button generates and saves one card using current settings, then opens it; the header Play action still uses the temporary `/play/1` route. Creation settings and generated-card previews remain within `/create`.

Local requirements and planning documents are kept in the git-ignored `docs/` directory: [implementation-steps.md](docs/implementation-steps.md), [requirements.md](docs/requirements.md), and [Tech requirements.md](<docs/Tech requirements.md>).

## Dependency review

At setup, `npm audit --omit=dev` reports no vulnerabilities. The full audit reports 15 development-tool vulnerabilities (2 low and 13 moderate), affecting ESLint/PWA dependency chains. Suggested fixes include tool downgrades that change compatibility; no forced fixes or transitive dependency overrides have been applied.
