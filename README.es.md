# SBTI Test

[English](./README.md) | [简体中文](./README.zh-CN.md) | [繁體中文](./README.zh-Hant.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | [Русский](./README.ru.md) | [हिन्दी](./README.hi.md) | [Deutsch](./README.de.md) | [ภาษาไทย](./README.th.md) | [Tiếng Việt](./README.vi.md) | [Bahasa Indonesia](./README.id.md) | [Bahasa Melayu](./README.ms.md)

## Resumen

SBTI es un proyecto web centrado en un test de personalidad de entretenimiento. Este repositorio contiene la implementación estática y multilingüe del sitio, con `README.md` en inglés como documento principal.

## Sitio oficial

- Sitio oficial: [https://www.sbti-test.org/es](https://www.sbti-test.org/es)
- Test oficial: [https://www.sbti-test.org/es/test](https://www.sbti-test.org/es/test)

## Contenido del repositorio

- Documento principal en inglés: [README.md](./README.md)
- Salida de páginas localizadas: `/` y `/<locale>/index.html`
- Datos de contenido multilingüe: `src/data/content/*.json`
- Imágenes multilingües de tipos: `public/sbti/types/<locale>/`

## Desarrollo local

```bash
npm install
npm run dev
```

Build de producción:

```bash
npm run build
npm run preview
```

## Licencia

Este proyecto se distribuye bajo la MIT License. Consulta [LICENSE](./LICENSE).
