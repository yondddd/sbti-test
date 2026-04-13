# SBTI Test

[English](./README.md) | [简体中文](./README.zh-CN.md) | [繁體中文](./README.zh-Hant.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | [Русский](./README.ru.md) | [हिन्दी](./README.hi.md) | [Deutsch](./README.de.md) | [ภาษาไทย](./README.th.md) | [Tiếng Việt](./README.vi.md) | [Bahasa Indonesia](./README.id.md) | [Bahasa Melayu](./README.ms.md)

## Überblick

SBTI ist ein Webprojekt rund um einen unterhaltsamen Persönlichkeitstest. Dieses Repository enthält die mehrsprachige statische Umsetzung der Website; `README.md` auf Englisch bleibt die zentrale Projektdokumentation.

## Offizielle Website

- Offizielle Startseite: [https://www.sbti-test.org/de](https://www.sbti-test.org/de)
- Offizielle Testseite: [https://www.sbti-test.org/de/test](https://www.sbti-test.org/de/test)

## Repository-Inhalt

- Hauptdokument auf Englisch: [README.md](./README.md)
- Lokalisierte Seitenausgabe: `/` und `/<locale>/index.html`
- Mehrsprachige Inhaltsdaten: `src/data/content/*.json`
- Mehrsprachige Typbilder: `public/sbti/types/<locale>/`

## Lokale Entwicklung

```bash
npm install
npm run dev
```

Produktions-Build:

```bash
npm run build
npm run preview
```

## Lizenz

Dieses Projekt steht unter der MIT License. Details siehe [LICENSE](./LICENSE).
