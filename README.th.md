# SBTI Test

[English](./README.md) | [简体中文](./README.zh-CN.md) | [繁體中文](./README.zh-Hant.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | [Русский](./README.ru.md) | [हिन्दी](./README.hi.md) | [Deutsch](./README.de.md) | [ภาษาไทย](./README.th.md) | [Tiếng Việt](./README.vi.md) | [Bahasa Indonesia](./README.id.md) | [Bahasa Melayu](./README.ms.md)

## ภาพรวม

SBTI เป็นโปรเจกต์เว็บเกี่ยวกับแบบทดสอบบุคลิกภาพเชิงความบันเทิง รีโพซิทอรีนี้มีเวอร์ชันเว็บไซต์แบบสแตติกหลายภาษา โดยใช้ `README.md` ภาษาอังกฤษเป็นเอกสารหลักของโปรเจกต์

## เว็บไซต์ทางการ

- เว็บไซต์ทางการ: [https://www.sbti-test.org/th](https://www.sbti-test.org/th)
- หน้าแบบทดสอบทางการ: [https://www.sbti-test.org/th/test](https://www.sbti-test.org/th/test)

## เนื้อหาในรีโพซิทอรี

- เอกสารหลักภาษาอังกฤษ: [README.md](./README.md)
- ไฟล์หน้าที่แปลแล้ว: `/` และ `/<locale>/index.html`
- ข้อมูลเนื้อหาหลายภาษา: `src/data/content/*.json`
- รูปภาพประเภทหลายภาษา: `public/sbti/types/<locale>/`

## การพัฒนาในเครื่อง

```bash
npm install
npm run dev
```

การ build สำหรับ production:

```bash
npm run build
npm run preview
```

## ใบอนุญาต

โปรเจกต์นี้ใช้ MIT License ดูรายละเอียดได้ที่ [LICENSE](./LICENSE)
