# SBTI Test

[English](./README.md) | [简体中文](./README.zh-CN.md) | [繁體中文](./README.zh-Hant.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | [Русский](./README.ru.md) | [हिन्दी](./README.hi.md) | [Deutsch](./README.de.md) | [ภาษาไทย](./README.th.md) | [Tiếng Việt](./README.vi.md) | [Bahasa Indonesia](./README.id.md) | [Bahasa Melayu](./README.ms.md)

## 概覽

SBTI 是一個以娛樂人格測驗為主題的網站專案。本倉庫提供該專案的多語言靜態網站實作，英文 README 為主要文件，站點內容支援 13 種語言。

## 官方網站

- 官方首頁: [https://www.sbti-test.org/zh-hant](https://www.sbti-test.org/zh-hant)
- 官方測試頁: [https://www.sbti-test.org/zh-hant/test](https://www.sbti-test.org/zh-hant/test)

## 倉庫內容

- 英文主文件: [README.md](./README.md)
- 在地化頁面輸出: `/` 與 `/<locale>/index.html`
- 多語言內容資料: `src/data/content/*.json`
- 多語言類型圖片: `public/sbti/types/<locale>/`

## 本地開發

```bash
npm install
npm run dev
```

正式建置:

```bash
npm run build
npm run preview
```

## 授權

本專案採用 MIT License。詳見 [LICENSE](./LICENSE)。
