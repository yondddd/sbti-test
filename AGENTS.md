# Repository Guide

Scope: repository root.

## Why This Exists

- This repo is a standalone multilingual static SBTI website prepared for GitHub publishing.
- It uses repo-local JSON content, a shared HTML/CSS/JS template, and a small build pipeline to generate the deployable pages.

## Owns

- `README.md` and all `README.<locale>.md` files
- `src/**` source data, runtime logic, and templates
- `scripts/**` generation and sync scripts
- `tests/*.test.mjs`
- generated root and locale pages in `/index.html` and `/<locale>/index.html`
- public type assets in `public/sbti/types/**`

## Structure

- `src/data/content/*.json`: source-of-truth localized SBTI content payloads
- `src/data/locales.json`: locale manifest and official site links
- `src/template/*`: shared page template and styling sources
- `src/runtime/engine.mjs`: shared quiz scoring/runtime logic
- `scripts/build.mjs`: regenerates root and locale HTML plus `assets/`
- `scripts/sync-source.mjs`: maintainer-only sync from the upstream app into repo-local JSON and assets
- `assets/`, `/index.html`, and `/<locale>/index.html`: generated site output committed in the repo

## Rules

- Keep `SBTI` untranslated in documentation and user-facing naming. Surrounding words may be localized.
- Treat `src/**` and `scripts/**` as the editable source of truth for site behavior and generated output.
- When changing site content or template behavior, update the source files first, then regenerate output with `npm run build:pages`.
- Do not hand-edit generated route pages or generated `assets/*` unless the task is specifically about checking in regenerated output after source changes.
- Keep README content useful to human readers first. Avoid repetitive or unnatural wording.
- Keep official website links aligned with `src/data/locales.json`.
- Keep the repo self-contained. Do not add machine-specific paths or provenance-style wording to public docs.
- `npm run sync` is maintainer-only and requires `SBTI_SOURCE_APP_DIR`. Do not assume that env var exists.
- Do not edit `dist/`; it is build output from Vite.
- Ignore editor-local files such as `.idea/**` unless the user explicitly asks for them.

## Verify

- Documentation or data changes: `npm test`
- Template, runtime, or generated page changes: `npm run build`
- Route/page generation only: `npm run build:pages`
- Optional local smoke check: `npm run dev`

## Notes For Agents

- The English `README.md` is the primary documentation contract. Localized README files should stay consistent with it at a summary level.
- The repo intentionally commits generated static pages, so source edits are usually followed by regenerated output in the same change.
