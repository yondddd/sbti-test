# SBTI Test

[English](./README.md) | [简体中文](./README.zh-CN.md) | [繁體中文](./README.zh-Hant.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | [Русский](./README.ru.md) | [हिन्दी](./README.hi.md) | [Deutsch](./README.de.md) | [ภาษาไทย](./README.th.md) | [Tiếng Việt](./README.vi.md) | [Bahasa Indonesia](./README.id.md) | [Bahasa Melayu](./README.ms.md)

## 概要

SBTI はエンタメ性のある性格テストをテーマにした Web プロジェクトです。このリポジトリには、多言語対応の静的 SBTI サイト実装が含まれており、英語版 README を主要ドキュメントとして利用します。

## 公式サイト

- 公式ホームページ: [https://www.sbti-test.org/ja](https://www.sbti-test.org/ja)
- 公式テストページ: [https://www.sbti-test.org/ja/test](https://www.sbti-test.org/ja/test)

## リポジトリ内容

- 英語版メインドキュメント: [README.md](./README.md)
- ローカライズ済みページ出力: `/` と `/<locale>/index.html`
- 多言語コンテンツデータ: `src/data/content/*.json`
- 多言語タイプ画像: `public/sbti/types/<locale>/`

## ローカル開発

```bash
npm install
npm run dev
```

本番ビルド:

```bash
npm run build
npm run preview
```

## ライセンス

このプロジェクトは MIT License の下で公開されています。詳細は [LICENSE](./LICENSE) を参照してください。
