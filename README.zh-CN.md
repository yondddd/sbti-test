# SBTI Test

[English](./README.md) | [简体中文](./README.zh-CN.md) | [繁體中文](./README.zh-Hant.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | [Русский](./README.ru.md) | [हिन्दी](./README.hi.md) | [Deutsch](./README.de.md) | [ภาษาไทย](./README.th.md) | [Tiếng Việt](./README.vi.md) | [Bahasa Indonesia](./README.id.md) | [Bahasa Melayu](./README.ms.md)

## 概览

SBTI 是一个以娱乐性格测试为主题的网站项目。本仓库提供该项目的多语言静态站点实现，主文档为英文，站点内容覆盖 13 种语言。

## 官方网站

- 官方首页: [https://www.sbti-test.org/](https://www.sbti-test.org/)
- 官方测试页: [https://www.sbti-test.org/test](https://www.sbti-test.org/test)

## 仓库内容

- 英文主文档: [README.md](./README.md)
- 本地化页面输出: `/` 与 `/<locale>/index.html`
- 多语言内容数据: `src/data/content/*.json`
- 多语言类型图片: `public/sbti/types/<locale>/`

## 本地开发

```bash
npm install
npm run dev
```

生产构建:

```bash
npm run build
npm run preview
```

## 许可

本项目采用 MIT License。详见 [LICENSE](./LICENSE)。
