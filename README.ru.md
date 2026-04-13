# SBTI Test

[English](./README.md) | [简体中文](./README.zh-CN.md) | [繁體中文](./README.zh-Hant.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | [Русский](./README.ru.md) | [हिन्दी](./README.hi.md) | [Deutsch](./README.de.md) | [ภาษาไทย](./README.th.md) | [Tiếng Việt](./README.vi.md) | [Bahasa Indonesia](./README.id.md) | [Bahasa Melayu](./README.ms.md)

## Обзор

SBTI — это веб-проект на тему развлекательного теста личности. Этот репозиторий содержит многоязычную статическую реализацию сайта, а `README.md` на английском языке остается основным документом проекта.

## Официальный сайт

- Официальный сайт: [https://www.sbti-test.org/ru](https://www.sbti-test.org/ru)
- Официальный тест: [https://www.sbti-test.org/ru/test](https://www.sbti-test.org/ru/test)

## Содержимое репозитория

- Основной документ на английском: [README.md](./README.md)
- Локализованные страницы: `/` и `/<locale>/index.html`
- Многоязычные данные контента: `src/data/content/*.json`
- Многоязычные изображения типов: `public/sbti/types/<locale>/`

## Локальная разработка

```bash
npm install
npm run dev
```

Продакшен-сборка:

```bash
npm run build
npm run preview
```

## Лицензия

Проект распространяется по лицензии MIT. Подробности см. в [LICENSE](./LICENSE).
