import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, '..');
const TEMPLATE_DIR = path.join(REPO_ROOT, 'src', 'template');
const DATA_DIR = path.join(REPO_ROOT, 'src', 'data');
const CONTENT_DIR = path.join(DATA_DIR, 'content');
const ASSETS_DIR = path.join(REPO_ROOT, 'assets');
const RUNTIME_SOURCE = path.join(REPO_ROOT, 'src', 'runtime', 'engine.mjs');
const STATIC_UI_COPY = {
  zh: {
    aboutTitle: '关于这个多语言静态版本',
    backToIntro: '返回介绍',
    dimensionsTitle: '十五维度',
    guideEyebrow: '导览',
    localizedHomeLabel: '对应语言首页',
    localizedTestLabel: '对应语言测试页',
    noteTitle: '说明',
    officialHome: '官网首页',
    officialSiteTitle: '官方网站',
    officialTest: '官网测试',
    restart: '重新开始',
    resultProfile: '结果解读',
  },
  'zh-hant': {
    aboutTitle: '關於這個多語靜態版本',
    backToIntro: '返回介紹',
    dimensionsTitle: '十五維度',
    guideEyebrow: '導覽',
    localizedHomeLabel: '對應語言首頁',
    localizedTestLabel: '對應語言測試頁',
    noteTitle: '說明',
    officialHome: '官網首頁',
    officialSiteTitle: '官方網站',
    officialTest: '官網測試',
    restart: '重新開始',
    resultProfile: '結果解讀',
  },
  ja: {
    aboutTitle: 'この多言語静的版について',
    backToIntro: 'イントロへ戻る',
    dimensionsTitle: '15次元',
    guideEyebrow: 'ガイド',
    localizedHomeLabel: '対応ホームページ',
    localizedTestLabel: '対応テストページ',
    noteTitle: '注意',
    officialHome: '公式ホーム',
    officialSiteTitle: '公式サイト',
    officialTest: '公式テスト',
    restart: 'もう一度診断する',
    resultProfile: '結果プロフィール',
  },
  ko: {
    aboutTitle: '이 다국어 정적 버전에 대해',
    backToIntro: '소개로 돌아가기',
    dimensionsTitle: '15개 차원',
    guideEyebrow: '가이드',
    localizedHomeLabel: '해당 언어 홈',
    localizedTestLabel: '해당 언어 테스트',
    noteTitle: '안내',
    officialHome: '공식 홈',
    officialSiteTitle: '공식 웹사이트',
    officialTest: '공식 테스트',
    restart: '다시 테스트',
    resultProfile: '결과 해석',
  },
  es: {
    aboutTitle: 'Sobre esta edición estática multilingüe',
    backToIntro: 'Volver a la introducción',
    dimensionsTitle: 'Quince dimensiones',
    guideEyebrow: 'Guía',
    localizedHomeLabel: 'Inicio oficial localizado',
    localizedTestLabel: 'Test oficial localizado',
    noteTitle: 'Nota',
    officialHome: 'Inicio oficial',
    officialSiteTitle: 'Sitio oficial',
    officialTest: 'Test oficial',
    restart: 'Reiniciar',
    resultProfile: 'Perfil del resultado',
  },
  ru: {
    aboutTitle: 'Об этой статической многоязычной версии',
    backToIntro: 'Назад к вступлению',
    dimensionsTitle: 'Пятнадцать измерений',
    guideEyebrow: 'Гид',
    localizedHomeLabel: 'Локализованная главная',
    localizedTestLabel: 'Локализованный тест',
    noteTitle: 'Примечание',
    officialHome: 'Официальный сайт',
    officialSiteTitle: 'Официальный сайт',
    officialTest: 'Официальный тест',
    restart: 'Пройти снова',
    resultProfile: 'Профиль результата',
  },
  hi: {
    aboutTitle: 'इस बहुभाषी स्थिर संस्करण के बारे में',
    backToIntro: 'परिचय पर लौटें',
    dimensionsTitle: 'पंद्रह आयाम',
    guideEyebrow: 'गाइड',
    localizedHomeLabel: 'स्थानीय आधिकारिक होम',
    localizedTestLabel: 'स्थानीय आधिकारिक टेस्ट',
    noteTitle: 'नोट',
    officialHome: 'आधिकारिक होम',
    officialSiteTitle: 'आधिकारिक वेबसाइट',
    officialTest: 'आधिकारिक टेस्ट',
    restart: 'फिर से शुरू करें',
    resultProfile: 'परिणाम प्रोफ़ाइल',
  },
  de: {
    aboutTitle: 'Über diese mehrsprachige statische Ausgabe',
    backToIntro: 'Zur Einführung zurück',
    dimensionsTitle: 'Fünfzehn Dimensionen',
    guideEyebrow: 'Guide',
    localizedHomeLabel: 'Lokalisierte Startseite',
    localizedTestLabel: 'Lokalisierte Testseite',
    noteTitle: 'Hinweis',
    officialHome: 'Offizielle Startseite',
    officialSiteTitle: 'Offizielle Website',
    officialTest: 'Offizieller Test',
    restart: 'Neu starten',
    resultProfile: 'Ergebnisprofil',
  },
  th: {
    aboutTitle: 'เกี่ยวกับเวอร์ชันสแตติกหลายภาษานี้',
    backToIntro: 'กลับไปหน้าแนะนำ',
    dimensionsTitle: '15 มิติ',
    guideEyebrow: 'คู่มือ',
    localizedHomeLabel: 'หน้าแรกทางการตามภาษา',
    localizedTestLabel: 'หน้าแบบทดสอบทางการตามภาษา',
    noteTitle: 'หมายเหตุ',
    officialHome: 'หน้าแรกทางการ',
    officialSiteTitle: 'เว็บไซต์ทางการ',
    officialTest: 'แบบทดสอบทางการ',
    restart: 'เริ่มใหม่',
    resultProfile: 'โปรไฟล์ผลลัพธ์',
  },
  vi: {
    aboutTitle: 'Về bản tĩnh đa ngôn ngữ này',
    backToIntro: 'Quay lại phần giới thiệu',
    dimensionsTitle: 'Mười lăm chiều',
    guideEyebrow: 'Hướng dẫn',
    localizedHomeLabel: 'Trang chủ chính thức theo ngôn ngữ',
    localizedTestLabel: 'Trang kiểm tra chính thức theo ngôn ngữ',
    noteTitle: 'Ghi chú',
    officialHome: 'Trang chủ chính thức',
    officialSiteTitle: 'Trang web chính thức',
    officialTest: 'Bài kiểm tra chính thức',
    restart: 'Làm lại',
    resultProfile: 'Hồ sơ kết quả',
  },
  id: {
    aboutTitle: 'Tentang edisi statis multibahasa ini',
    backToIntro: 'Kembali ke pengantar',
    dimensionsTitle: 'Lima belas dimensi',
    guideEyebrow: 'Panduan',
    localizedHomeLabel: 'Beranda resmi berbahasa lokal',
    localizedTestLabel: 'Tes resmi berbahasa lokal',
    noteTitle: 'Catatan',
    officialHome: 'Beranda resmi',
    officialSiteTitle: 'Situs resmi',
    officialTest: 'Tes resmi',
    restart: 'Mulai lagi',
    resultProfile: 'Profil hasil',
  },
  ms: {
    aboutTitle: 'Tentang edisi statik berbilang bahasa ini',
    backToIntro: 'Kembali ke pengenalan',
    dimensionsTitle: 'Lima belas dimensi',
    guideEyebrow: 'Panduan',
    localizedHomeLabel: 'Laman rasmi mengikut bahasa',
    localizedTestLabel: 'Halaman ujian rasmi mengikut bahasa',
    noteTitle: 'Catatan',
    officialHome: 'Laman rasmi',
    officialSiteTitle: 'Laman web rasmi',
    officialTest: 'Ujian rasmi',
    restart: 'Mula semula',
    resultProfile: 'Profil keputusan',
  },
  en: {
    aboutTitle: 'About this localized static edition',
    backToIntro: 'Back to Intro',
    dimensionsTitle: 'Fifteen Dimensions',
    guideEyebrow: 'Guide',
    localizedHomeLabel: 'Localized homepage',
    localizedTestLabel: 'Localized test page',
    noteTitle: 'Note',
    officialHome: 'Official Home',
    officialSiteTitle: 'Official Website',
    officialTest: 'Official Test',
    restart: 'Restart',
    resultProfile: 'Result Profile',
  },
};

function ensureDir(dirPath) {
  mkdirSync(dirPath, { recursive: true });
}

function loadJson(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf8'));
}

function formatTemplate(template, values) {
  return template.replace(/__([A-Z0-9_]+)__/g, (_, key) => values[key] ?? '');
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function toInlineJson(value) {
  return JSON.stringify(value).replaceAll('</script>', '<\\/script>');
}

function removeGeneratedOutputs() {
  for (const entry of [
    'index.html',
    'assets',
    'sbti',
    'zh',
    'zh-hant',
    'ja',
    'ko',
    'es',
    'ru',
    'hi',
    'de',
    'th',
    'vi',
    'id',
    'ms',
  ]) {
    rmSync(path.join(REPO_ROOT, entry), { force: true, recursive: true });
  }
}

function renderLocaleNav(locales, currentLocale) {
  return locales
    .map((locale) => {
      const href = locale.repoPath;
      const current = locale.locale === currentLocale ? ' aria-current="page"' : '';
      return `<a href="${href}"${current}>${escapeHtml(locale.nativeName)}</a>`;
    })
    .join('');
}

function renderInfoCards(pageCopy) {
  const cards = [
    [pageCopy.intro.whatIsTitle, pageCopy.intro.whatIsBody],
    [pageCopy.intro.mbtiRelationTitle, pageCopy.intro.mbtiRelationBody],
    [pageCopy.intro.whyTestTitle, pageCopy.intro.whyTestBody],
    [pageCopy.intro.suitableTitle, pageCopy.intro.suitableBody],
  ];

  return cards
    .map(
      ([title, body]) => `
        <article class="mini-panel">
          <h3>${escapeHtml(title)}</h3>
          <p>${escapeHtml(body)}</p>
        </article>
      `
    )
    .join('');
}

function renderFaq(pageCopy) {
  return pageCopy.faq.items
    .map(
      ([question, answer]) => `
        <details class="faq-item">
          <summary>${escapeHtml(question)}</summary>
          <p>${escapeHtml(answer)}</p>
        </details>
      `
    )
    .join('');
}

function writePage(localeManifestEntry, content, allLocales, template) {
  const locale = localeManifestEntry.locale;
  const staticUi = STATIC_UI_COPY[locale] ?? STATIC_UI_COPY.en;
  const assetPrefix = locale === 'en' ? '.' : '..';
  const outputDir = locale === 'en' ? REPO_ROOT : path.join(REPO_ROOT, locale);
  ensureDir(outputDir);

  const pageData = {
    chrome: content.chrome,
    dimensionMeta: content.dimensionMeta,
    dimensionOrder: content.dimensionOrder,
    dimExplanations: content.dimExplanations,
    drunkTriggerQuestionId: content.drunkTriggerQuestionId,
    imagePaths: content.imagePaths,
    locale,
    normalTypes: content.normalTypes,
    pageCopy: content.pageCopy,
    questions: content.questions,
    specialQuestions: content.specialQuestions,
    typeLibrary: content.typeLibrary,
  };

  const html = formatTemplate(template, {
    ASSET_PREFIX: assetPrefix,
    ABOUT_TITLE: escapeHtml(staticUi.aboutTitle),
    BACK_TO_INTRO_LABEL: escapeHtml(staticUi.backToIntro),
    CREDIT_ITEMS: content.chrome.intro.credits
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join(''),
    CREDIT_TITLE: escapeHtml(content.chrome.intro.creditTitle),
    DIMENSIONS_TITLE: escapeHtml(staticUi.dimensionsTitle),
    FAQ_ITEMS: renderFaq(content.pageCopy),
    FAQ_TITLE: escapeHtml(content.pageCopy.faq.title),
    GUIDE_EYEBROW: escapeHtml(staticUi.guideEyebrow),
    HERO_EYEBROW: escapeHtml(content.chrome.intro.eyebrow),
    HERO_SUBTITLE: escapeHtml(content.pageCopy.intro.heroSubtitle),
    HERO_TITLE: escapeHtml(content.pageCopy.intro.heroTitle),
    HTML_LANG: escapeHtml(localeManifestEntry.htmlLang),
    INFO_CARDS: renderInfoCards(content.pageCopy),
    JSON_DATA: toInlineJson(pageData),
    LOCALE: escapeHtml(locale),
    LOCALE_NAV: renderLocaleNav(allLocales, locale),
    META_DESCRIPTION: escapeHtml(content.meta.description),
    LOCALIZED_HOME_LABEL: escapeHtml(staticUi.localizedHomeLabel),
    LOCALIZED_TEST_LABEL: escapeHtml(staticUi.localizedTestLabel),
    NOTE_TITLE: escapeHtml(staticUi.noteTitle),
    OFFICIAL_HOME_LABEL: escapeHtml(staticUi.officialHome),
    OFFICIAL_HOME_URL: escapeHtml(localeManifestEntry.officialHomeUrl),
    OFFICIAL_SITE_TITLE: escapeHtml(staticUi.officialSiteTitle),
    OFFICIAL_TEST_LABEL: escapeHtml(staticUi.officialTest),
    OFFICIAL_TEST_URL: escapeHtml(localeManifestEntry.officialTestUrl),
    PAGE_TITLE: escapeHtml(content.meta.title),
    PRIMARY_CTA: escapeHtml(content.chrome.intro.start),
    RESULT_PROFILE_TITLE: escapeHtml(staticUi.resultProfile),
    RESTART_LABEL: escapeHtml(staticUi.restart),
    SECONDARY_CTA: escapeHtml(content.pageCopy.intro.viewAllTypesCta),
    TEST_BACK_LABEL: escapeHtml(content.chrome.test.backHome),
    TEST_COMPLETE_HINT: escapeHtml(content.chrome.test.completeHint),
    TEST_HINT: escapeHtml(content.chrome.test.incompleteHint),
    TEST_SUBMIT_LABEL: escapeHtml(content.chrome.test.submit),
    TYPES_DESCRIPTION: escapeHtml(content.pageCopy.types.typesDescription),
    TYPES_EYEBROW: escapeHtml(content.pageCopy.types.typesEyebrow),
    TYPES_TITLE: escapeHtml(content.pageCopy.types.typesTitle),
  });

  writeFileSync(path.join(outputDir, 'index.html'), `${html}\n`, 'utf8');
}

if (!existsSync(path.join(DATA_DIR, 'locales.json'))) {
  throw new Error('Missing src/data/locales.json. Run `npm run sync` first.');
}

removeGeneratedOutputs();
ensureDir(ASSETS_DIR);

cpSync(path.join(TEMPLATE_DIR, 'styles.css'), path.join(ASSETS_DIR, 'styles.css'));
cpSync(path.join(TEMPLATE_DIR, 'app.js'), path.join(ASSETS_DIR, 'app.js'));
cpSync(RUNTIME_SOURCE, path.join(ASSETS_DIR, 'engine.js'));

const template = readFileSync(path.join(TEMPLATE_DIR, 'page.html'), 'utf8');
const locales = loadJson(path.join(DATA_DIR, 'locales.json'));

for (const localeEntry of locales) {
  const content = loadJson(path.join(CONTENT_DIR, `${localeEntry.locale}.json`));
  writePage(localeEntry, content, locales, template);
}
