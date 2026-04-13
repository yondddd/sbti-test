# SBTI Test

[English](./README.md) | [简体中文](./README.zh-CN.md) | [繁體中文](./README.zh-Hant.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | [Русский](./README.ru.md) | [हिन्दी](./README.hi.md) | [Deutsch](./README.de.md) | [ภาษาไทย](./README.th.md) | [Tiếng Việt](./README.vi.md) | [Bahasa Indonesia](./README.id.md) | [Bahasa Melayu](./README.ms.md)

## परिचय

SBTI एक मनोरंजन-केंद्रित व्यक्तित्व परीक्षण वेब प्रोजेक्ट है। यह रिपॉज़िटरी साइट का बहुभाषी स्थिर संस्करण प्रदान करती है, और `README.md` अंग्रेज़ी में मुख्य परियोजना दस्तावेज़ बना रहता है।

## आधिकारिक साइट

- आधिकारिक होमपेज: [https://www.sbti-test.org/hi](https://www.sbti-test.org/hi)
- आधिकारिक टेस्ट पेज: [https://www.sbti-test.org/hi/test](https://www.sbti-test.org/hi/test)

## रिपॉज़िटरी सामग्री

- मुख्य अंग्रेज़ी दस्तावेज़: [README.md](./README.md)
- लोकलाइज़्ड पेज आउटपुट: `/` और `/<locale>/index.html`
- बहुभाषी कंटेंट डेटा: `src/data/content/*.json`
- बहुभाषी टाइप इमेज: `public/sbti/types/<locale>/`

## लोकल डेवलपमेंट

```bash
npm install
npm run dev
```

प्रोडक्शन बिल्ड:

```bash
npm run build
npm run preview
```

## लाइसेंस

यह प्रोजेक्ट MIT License के अंतर्गत उपलब्ध है। विवरण के लिए [LICENSE](./LICENSE) देखें।
