# SBTI Test

[English](./README.md) | [简体中文](./README.zh-CN.md) | [繁體中文](./README.zh-Hant.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | [Русский](./README.ru.md) | [हिन्दी](./README.hi.md) | [Deutsch](./README.de.md) | [ภาษาไทย](./README.th.md) | [Tiếng Việt](./README.vi.md) | [Bahasa Indonesia](./README.id.md) | [Bahasa Melayu](./README.ms.md)

## Ringkasan

SBTI ialah projek web bertema ujian personaliti untuk hiburan. Repositori ini menyediakan pelaksanaan laman statik berbilang bahasa, dengan `README.md` berbahasa Inggeris sebagai dokumentasi utama projek.

## Laman rasmi

- Laman rasmi: [https://www.sbti-test.org/ms](https://www.sbti-test.org/ms)
- Halaman ujian rasmi: [https://www.sbti-test.org/ms/test](https://www.sbti-test.org/ms/test)

## Kandungan repositori

- Dokumen utama berbahasa Inggeris: [README.md](./README.md)
- Output halaman setempat: `/` dan `/<locale>/index.html`
- Data kandungan berbilang bahasa: `src/data/content/*.json`
- Imej jenis berbilang bahasa: `public/sbti/types/<locale>/`

## Pembangunan setempat

```bash
npm install
npm run dev
```

Build produksi:

```bash
npm run build
npm run preview
```

## Lesen

Projek ini menggunakan MIT License. Lihat [LICENSE](./LICENSE).
