# SBTI Test: Free SBTI Personality Test

[English](./README.md) | [简体中文](./README.zh-CN.md) | [繁體中文](./README.zh-Hant.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | [Русский](./README.ru.md) | [हिन्दी](./README.hi.md) | [Deutsch](./README.de.md) | [ภาษาไทย](./README.th.md) | [Tiếng Việt](./README.vi.md) | [Bahasa Indonesia](./README.id.md) | [Bahasa Melayu](./README.ms.md)

## Overview

The SBTI test is a free, joke-first SBTI personality test available at [sbti-test.org](https://www.sbti-test.org/en/test). This repository packages that experience as a multilingual static site with English-first documentation, plain HTML/CSS/JS templates, and repo-local content for every supported locale.

If you found this repository while searching for `sbti test` or `sbti personality test`, the short version is simple: SBTI is an entertainment-first personality quiz, openly framed as a humorous MBTI parody, and built for quick results, screenshots, and easy sharing rather than science or diagnosis.

Separate project introductions are available in dedicated language files linked above. `README.md` remains the primary project document.

## What Is the SBTI Test?

The SBTI personality test expands to `Silly Big Personality Test`. In product terms, it is a joke-first personality quiz that keeps the familiar "answer questions -> get a result" flow while deliberately leaning into absurdity, satire, and self-mockery.

This repository follows the same public framing already used in the site content:

- SBTI is free to take
- SBTI is built for entertainment
- SBTI is designed for easy sharing
- SBTI is not medical, psychological, or scientific guidance

## How SBTI Relates to MBTI

SBTI is explicitly positioned as a humorous parody of MBTI. The SBTI personality test borrows the recognizable quiz-to-result format that people expect from MBTI-style personality content, but it does not present itself as a serious personality framework.

In practice, that means:

- MBTI is the comparison point most users already recognize
- SBTI uses parody framing instead of scientific framing
- SBTI aims for entertainment, replayability, and shareable results
- SBTI can feel familiar, but the repo docs should treat it as humor first

For the official public experience, see the live English site at [sbti-test.org/en](https://www.sbti-test.org/en) and the live test at [sbti-test.org/en/test](https://www.sbti-test.org/en/test).

## SBTI Personality Dimensions

The SBTI personality test scores 15 dimensions. The site content groups those dimensions into five broader models: self, emotion, attitude, action drive, and social expression. The docs do not need to reverse-engineer the scoring logic, but they should explain that the quiz is broader than a simple one-axis joke result.

| Code | Dimension | Group |
| --- | --- | --- |
| `S1` | Self-esteem and confidence | Self model |
| `S2` | Self clarity | Self model |
| `S3` | Core values | Self model |
| `E1` | Attachment security | Emotion model |
| `E2` | Emotional involvement | Emotion model |
| `E3` | Boundaries and dependencies | Emotion model |
| `A1` | Worldview tendency | Attitude model |
| `A2` | Rules and flexibility | Attitude model |
| `A3` | Sense of meaning in life | Attitude model |
| `Ac1` | Motivation orientation | Action drive model |
| `Ac2` | Decision-making style | Action drive model |
| `Ac3` | Execution mode | Action drive model |
| `So1` | Social initiative | Social model |
| `So2` | Sense of interpersonal boundaries | Social model |
| `So3` | Expression and authenticity | Social model |

This 15-dimension structure is why the SBTI personality test feels richer than a simple "pick one letter" joke. Even though SBTI is parody content, the quiz still organizes results across multiple behavioral lenses before mapping them to a final type.

## Why People Take the SBTI Personality Test

People usually take the SBTI test for the same reasons they share memes, roast their friends, or compare quiz results in group chats:

- the SBTI personality test is quick
- the result types are easy to screenshot and share
- the MBTI parody angle is immediately understandable
- the 15-dimension setup makes the result feel more personal
- the entire SBTI test is free and requires no sign-up

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
- `SBTI` stays untranslated across all README files and site-facing naming

## FAQ

### What is SBTI?

SBTI is a joke-first personality quiz and an SBTI personality test built for satire, self-mockery, and easy sharing. It uses the familiar quiz structure people associate with MBTI, but its public framing is explicitly humorous.

### Is the SBTI result accurate?

The SBTI test can feel uncomfortably familiar, but it is still an entertainment-first SBTI personality test. Treat the result as satire, self-observation, and shareable fun, not as a serious decision tool.

### How long does the SBTI test take?

The SBTI test usually takes about as long as a coffee break. The SBTI personality test has no time limit, so first-instinct answers are usually enough.

### How is SBTI different from MBTI?

MBTI is the serious comparison point. SBTI is the parody version: same broad "take a personality quiz" shape, but with a joke-first tone, more absurd results, and no claim to scientific rigor.

### Why are there 15 dimensions in the SBTI personality test?

The site content uses 15 dimensions to organize results across self, emotion, attitude, action drive, and social expression. That structure makes the SBTI personality test feel more layered before it resolves to a final type.

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE).

## Acknowledgments

- The official website at [sbti-test.org](https://www.sbti-test.org/) for the live multilingual route references
