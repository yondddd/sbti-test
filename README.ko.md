# SBTI Test

[English](./README.md) | [简体中文](./README.zh-CN.md) | [繁體中文](./README.zh-Hant.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | [Русский](./README.ru.md) | [हिन्दी](./README.hi.md) | [Deutsch](./README.de.md) | [ภาษาไทย](./README.th.md) | [Tiếng Việt](./README.vi.md) | [Bahasa Indonesia](./README.id.md) | [Bahasa Melayu](./README.ms.md)

## 개요

SBTI는 재미 중심의 성격 테스트를 주제로 한 웹 프로젝트입니다. 이 저장소는 다국어 정적 SBTI 사이트 구현을 제공하며, 영어 README를 기본 프로젝트 문서로 사용합니다.

## 공식 사이트

- 공식 홈페이지: [https://www.sbti-test.org/ko](https://www.sbti-test.org/ko)
- 공식 테스트 페이지: [https://www.sbti-test.org/ko/test](https://www.sbti-test.org/ko/test)

## 저장소 구성

- 영어 기본 문서: [README.md](./README.md)
- 현지화 페이지 출력: `/` 및 `/<locale>/index.html`
- 다국어 콘텐츠 데이터: `src/data/content/*.json`
- 다국어 유형 이미지: `public/sbti/types/<locale>/`

## 로컬 개발

```bash
npm install
npm run dev
```

프로덕션 빌드:

```bash
npm run build
npm run preview
```

## 라이선스

이 프로젝트는 MIT License를 따릅니다. 자세한 내용은 [LICENSE](./LICENSE)를 확인하세요.
