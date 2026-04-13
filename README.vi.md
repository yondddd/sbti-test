# SBTI Test

[English](./README.md) | [简体中文](./README.zh-CN.md) | [繁體中文](./README.zh-Hant.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | [Русский](./README.ru.md) | [हिन्दी](./README.hi.md) | [Deutsch](./README.de.md) | [ภาษาไทย](./README.th.md) | [Tiếng Việt](./README.vi.md) | [Bahasa Indonesia](./README.id.md) | [Bahasa Melayu](./README.ms.md)

## Tổng quan

SBTI là một dự án web về bài kiểm tra tính cách mang tính giải trí. Kho lưu trữ này cung cấp phiên bản tĩnh đa ngôn ngữ của trang web, với `README.md` tiếng Anh là tài liệu chính của dự án.

## Trang chính thức

- Trang chủ chính thức: [https://www.sbti-test.org/vi](https://www.sbti-test.org/vi)
- Trang kiểm tra chính thức: [https://www.sbti-test.org/vi/test](https://www.sbti-test.org/vi/test)

## Nội dung kho lưu trữ

- Tài liệu chính bằng tiếng Anh: [README.md](./README.md)
- Kết quả trang đã bản địa hóa: `/` và `/<locale>/index.html`
- Dữ liệu nội dung đa ngôn ngữ: `src/data/content/*.json`
- Hình ảnh kiểu đa ngôn ngữ: `public/sbti/types/<locale>/`

## Phát triển cục bộ

```bash
npm install
npm run dev
```

Build production:

```bash
npm run build
npm run preview
```

## Giấy phép

Dự án này được phát hành theo MIT License. Xem [LICENSE](./LICENSE).
