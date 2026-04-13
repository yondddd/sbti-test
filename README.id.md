# SBTI Test

[English](./README.md) | [简体中文](./README.zh-CN.md) | [繁體中文](./README.zh-Hant.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | [Русский](./README.ru.md) | [हिन्दी](./README.hi.md) | [Deutsch](./README.de.md) | [ภาษาไทย](./README.th.md) | [Tiếng Việt](./README.vi.md) | [Bahasa Indonesia](./README.id.md) | [Bahasa Melayu](./README.ms.md)

## Ringkasan

SBTI adalah proyek web bertema tes kepribadian untuk hiburan. Repositori ini menyediakan implementasi situs statis multibahasa, dengan `README.md` berbahasa Inggris sebagai dokumentasi utama proyek.

## Situs resmi

- Situs resmi: [https://www.sbti-test.org/id](https://www.sbti-test.org/id)
- Halaman tes resmi: [https://www.sbti-test.org/id/test](https://www.sbti-test.org/id/test)

## Isi repositori

- Dokumen utama berbahasa Inggris: [README.md](./README.md)
- Output halaman terlokalisasi: `/` dan `/<locale>/index.html`
- Data konten multibahasa: `src/data/content/*.json`
- Gambar tipe multibahasa: `public/sbti/types/<locale>/`

## Pengembangan lokal

```bash
npm install
npm run dev
```

Build produksi:

```bash
npm run build
npm run preview
```

## Lisensi

Proyek ini menggunakan MIT License. Lihat [LICENSE](./LICENSE).
