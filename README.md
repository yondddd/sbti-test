# SBTI Test

[English](./README.md) | [简体中文](./README.zh-CN.md) | [繁體中文](./README.zh-Hant.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | [Русский](./README.ru.md) | [हिन्दी](./README.hi.md) | [Deutsch](./README.de.md) | [ภาษาไทย](./README.th.md) | [Tiếng Việt](./README.vi.md) | [Bahasa Indonesia](./README.id.md) | [Bahasa Melayu](./README.ms.md)

## Overview

`SBTI Test` is a standalone multilingual static site built with a simple Vite-based workflow on top of plain HTML/CSS/JS.

This repository is English-first for documentation and the root page, while the site output supports 13 locales:

- `zh`
- `zh-hant`
- `en`
- `ja`
- `ko`
- `es`
- `ru`
- `hi`
- `de`
- `th`
- `vi`
- `id`
- `ms`

Separate project introductions are available in dedicated language files linked above. `README.md` remains the primary project document.

## Languages

| Locale | Native name | Local repo path |
| --- | --- | --- |
| `en` | English | `/` |
| `zh` | 简体中文 | `/zh/` |
| `zh-hant` | 繁體中文 | `/zh-hant/` |
| `ja` | 日本語 | `/ja/` |
| `ko` | 한국어 | `/ko/` |
| `es` | Español | `/es/` |
| `ru` | Русский | `/ru/` |
| `hi` | हिन्दी | `/hi/` |
| `de` | Deutsch | `/de/` |
| `th` | ภาษาไทย | `/th/` |
| `vi` | Tiếng Việt | `/vi/` |
| `id` | Bahasa Indonesia | `/id/` |
| `ms` | Bahasa Melayu | `/ms/` |

## Official Website Links

The README and locale manifest follow the live `sbti-test.org` URL structure verified on April 13, 2026.

| Locale | Official homepage | Official test |
| --- | --- | --- |
| `zh` | [https://www.sbti-test.org/](https://www.sbti-test.org/) | [https://www.sbti-test.org/test](https://www.sbti-test.org/test) |
| `zh-hant` | [https://www.sbti-test.org/zh-hant](https://www.sbti-test.org/zh-hant) | [https://www.sbti-test.org/zh-hant/test](https://www.sbti-test.org/zh-hant/test) |
| `en` | [https://www.sbti-test.org/en](https://www.sbti-test.org/en) | [https://www.sbti-test.org/en/test](https://www.sbti-test.org/en/test) |
| `ja` | [https://www.sbti-test.org/ja](https://www.sbti-test.org/ja) | [https://www.sbti-test.org/ja/test](https://www.sbti-test.org/ja/test) |
| `ko` | [https://www.sbti-test.org/ko](https://www.sbti-test.org/ko) | [https://www.sbti-test.org/ko/test](https://www.sbti-test.org/ko/test) |
| `es` | [https://www.sbti-test.org/es](https://www.sbti-test.org/es) | [https://www.sbti-test.org/es/test](https://www.sbti-test.org/es/test) |
| `ru` | [https://www.sbti-test.org/ru](https://www.sbti-test.org/ru) | [https://www.sbti-test.org/ru/test](https://www.sbti-test.org/ru/test) |
| `hi` | [https://www.sbti-test.org/hi](https://www.sbti-test.org/hi) | [https://www.sbti-test.org/hi/test](https://www.sbti-test.org/hi/test) |
| `de` | [https://www.sbti-test.org/de](https://www.sbti-test.org/de) | [https://www.sbti-test.org/de/test](https://www.sbti-test.org/de/test) |
| `th` | [https://www.sbti-test.org/th](https://www.sbti-test.org/th) | [https://www.sbti-test.org/th/test](https://www.sbti-test.org/th/test) |
| `vi` | [https://www.sbti-test.org/vi](https://www.sbti-test.org/vi) | [https://www.sbti-test.org/vi/test](https://www.sbti-test.org/vi/test) |
| `id` | [https://www.sbti-test.org/id](https://www.sbti-test.org/id) | [https://www.sbti-test.org/id/test](https://www.sbti-test.org/id/test) |
| `ms` | [https://www.sbti-test.org/ms](https://www.sbti-test.org/ms) | [https://www.sbti-test.org/ms/test](https://www.sbti-test.org/ms/test) |

## Features

- Standalone static site with a standard Vite dev/build workflow
- Root English homepage plus 12 additional locale folders
- Shared data-driven quiz engine across all locales
- Localized quiz copy, result copy, FAQ copy, and type descriptions
- Preserved multilingual type image filenames inside the repository
- Committed generated site output so the repository is upload-ready
- Optional content sync script for maintainers

## Project Structure

```text
.
├── assets/                  # Source JS/CSS used by the generated pages
├── public/sbti/types/       # Public localized type image assets
├── scripts/
│   ├── build.mjs            # Regenerates root and locale HTML pages
│   └── sync-source.mjs      # Refreshes repo-local JSON and public assets
├── src/
│   ├── data/
│   │   ├── locales.json     # Locale manifest
│   │   └── content/*.json   # Repo-local multilingual content payloads
│   ├── runtime/engine.mjs   # Shared scoring engine
│   └── template/            # Shared HTML/CSS/JS template files
├── tests/                   # Repo contract and output verification
├── vite.config.mjs          # Multi-page Vite build config
├── index.html               # English root page
└── <locale>/index.html      # Non-English localized pages
```

## Getting Started

This repository is already generated and can be uploaded to GitHub directly.

To run locally with a standard frontend workflow:

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm run preview
# equivalent Vite command
vite preview
```

## Development / Build

Available scripts:

```bash
npm run sync
npm run build:pages
npm run dev
npm run build
npm run preview
npm test
```

Notes:

- `npm run sync` refreshes `src/data/**/*.json` and `public/sbti/types/**`. Set `SBTI_SOURCE_APP_DIR` first if you use this maintainer workflow.
- `npm run build:pages` regenerates `index.html`, locale folders, and source `assets/`.
- `npm run dev` starts a Vite dev server and serves `public/sbti/**` at `/sbti/**`.
- `npm run build` runs page generation and then emits the deployable Vite output into `dist/`.
- `npm run preview` previews the built `dist/` output through Vite.
- `npm test` checks the locale manifest, local content files, generated route output, and README contract.

## Project Contents

All runtime content required by the site is committed in this repository:

- localized page payloads in `src/data/content/*.json`
- locale metadata in `src/data/locales.json`
- public type images in `public/sbti/types/<locale>/`

This keeps the project self-contained for normal development and deployment.

## Localization

Localization in this repository is file-based and repo-local.

- Locale metadata lives in `src/data/locales.json`
- Locale content payloads live in `src/data/content/*.json`
- Localized image assets live in `public/sbti/types/<locale>/`
- Vite serves and builds the public assets without duplicating `sbti/` at the repo root
- Localized project introductions live in `README.<locale>.md` files

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE).

## Acknowledgments

- The official website at [sbti-test.org](https://www.sbti-test.org/) for the live multilingual route references
