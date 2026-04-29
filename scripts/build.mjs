import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
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
const BLOG_DIR = path.join(DATA_DIR, 'blog');
const CONTENT_DIR = path.join(DATA_DIR, 'content');
const POSTS_DIR = path.join(DATA_DIR, 'posts');
const ASSETS_DIR = path.join(REPO_ROOT, 'assets');
const RUNTIME_SOURCE = path.join(REPO_ROOT, 'src', 'runtime', 'engine.mjs');
const STALE_GENERATED_DIRS = ['hi'];
const PINNED_BLOG_POST_SLUGS = ['sbti-strategy-guide'];
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
  fr: {
    aboutTitle: 'A propos de cette edition statique multilingue',
    backToIntro: "Retour a l'introduction",
    dimensionsTitle: 'Quinze dimensions',
    guideEyebrow: 'Guide',
    localizedHomeLabel: 'Accueil localise',
    localizedTestLabel: 'Test localise',
    noteTitle: 'Note',
    officialHome: 'Accueil officiel',
    officialSiteTitle: 'Site officiel',
    officialTest: 'Test officiel',
    restart: 'Recommencer',
    resultProfile: 'Profil du resultat',
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
  ar: {
    aboutTitle: 'حول هذه النسخة الثابتة متعددة اللغات',
    backToIntro: 'العودة إلى المقدمة',
    dimensionsTitle: 'خمسة عشر بعدا',
    guideEyebrow: 'دليل',
    localizedHomeLabel: 'الصفحة الرئيسية المحلية',
    localizedTestLabel: 'صفحة الاختبار المحلية',
    noteTitle: 'ملاحظة',
    officialHome: 'الصفحة الرسمية',
    officialSiteTitle: 'الموقع الرسمي',
    officialTest: 'الاختبار الرسمي',
    restart: 'إعادة البدء',
    resultProfile: 'ملف النتيجة',
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

function removeGeneratedOutputs(locales) {
  const localeDirs = locales
    .map((entry) => entry.locale)
    .filter((locale) => locale !== 'en');

  for (const entry of [
    'index.html',
    'assets',
    'blog',
    'sbti',
    ...localeDirs,
    ...STALE_GENERATED_DIRS,
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
    .map((item) => {
      const question = Array.isArray(item) ? item[0] : item.question;
      const answer = Array.isArray(item) ? item[1] : item.answer;

      return `
        <details class="faq-item">
          <summary>${escapeHtml(question)}</summary>
          <p>${escapeHtml(answer)}</p>
        </details>
      `;
    })
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

function stripFrontmatter(markdown) {
  if (!markdown.startsWith('---\n')) {
    return { body: markdown, frontmatter: {} };
  }

  const endIndex = markdown.indexOf('\n---\n', 4);
  if (endIndex === -1) {
    return { body: markdown, frontmatter: {} };
  }

  return {
    body: markdown.slice(endIndex + 5),
    frontmatter: parseFrontmatter(markdown.slice(4, endIndex)),
  };
}

function parseFrontmatter(source) {
  const frontmatter = {};
  const lines = source.split('\n');

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const match = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!match) {
      continue;
    }

    const [, key, rawValue] = match;
    if (rawValue.trim()) {
      frontmatter[key] = rawValue.trim().replace(/^['"]|['"]$/g, '');
      continue;
    }

    const values = [];
    while (lines[index + 1]?.match(/^\s+-\s+/)) {
      index += 1;
      values.push(lines[index].replace(/^\s+-\s+/, '').trim().replace(/^['"]|['"]$/g, ''));
    }
    frontmatter[key] = values;
  }

  return frontmatter;
}

function getPostLocaleAndSlug(filename) {
  const name = filename.replace(/\.mdx$/, '');
  const localeMatch = name.match(/^(.*)\.([a-z]{2}(?:-[a-z]+)?)$/);

  if (!localeMatch) {
    return { locale: 'zh', slug: name };
  }

  return {
    locale: localeMatch[2],
    slug: localeMatch[1],
  };
}

function getPostPath(locale, slug) {
  return locale === 'en' ? `/blog/${slug}/` : `/${locale}/blog/${slug}/`;
}

function getBlogIndexPath(locale) {
  return locale === 'en' ? '/blog/' : `/${locale}/blog/`;
}

function getOutputDirForPath(routePath) {
  const cleanPath = routePath.replace(/^\/+|\/+$/g, '');
  return cleanPath ? path.join(REPO_ROOT, cleanPath) : REPO_ROOT;
}

function getAssetPrefix(outputDir) {
  return path.relative(outputDir, REPO_ROOT).replaceAll(path.sep, '/') || '.';
}

function formatPostDate(value, locale) {
  if (!value) {
    return '';
  }

  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) {
    return value;
  }

  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
    year: 'numeric',
  }).format(new Date(timestamp));
}

function renderInlineMarkdown(value) {
  const codePlaceholders = [];
  let html = escapeHtml(value).replace(/`([^`]+)`/g, (_, code) => {
    const key = `@@CODE_${codePlaceholders.length}@@`;
    codePlaceholders.push(`<code>${code}</code>`);
    return key;
  });

  html = html
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  for (const [index, code] of codePlaceholders.entries()) {
    html = html.replaceAll(`@@CODE_${index}@@`, code);
  }

  return html;
}

function renderMarkdownTable(lines) {
  const rows = lines.map((line) =>
    line
      .trim()
      .replace(/^\||\|$/g, '')
      .split('|')
      .map((cell) => cell.trim())
  );
  const [header, , ...bodyRows] = rows;

  return `
    <div class="table-scroll">
      <table>
        <thead><tr>${header.map((cell) => `<th>${renderInlineMarkdown(cell)}</th>`).join('')}</tr></thead>
        <tbody>
          ${bodyRows
            .map(
              (row) =>
                `<tr>${row.map((cell) => `<td>${renderInlineMarkdown(cell)}</td>`).join('')}</tr>`
            )
            .join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderMarkdown(markdown) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const html = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];

    if (!line.trim()) {
      continue;
    }

    if (line.startsWith('```')) {
      const codeLines = [];
      while (index + 1 < lines.length && !lines[index + 1].startsWith('```')) {
        index += 1;
        codeLines.push(lines[index]);
      }
      index += 1;
      html.push(`<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`);
      continue;
    }

    const heading = line.match(/^(#{2,4})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      html.push(`<h${level}>${renderInlineMarkdown(heading[2])}</h${level}>`);
      continue;
    }

    if (line.trim().startsWith('|') && lines[index + 1]?.trim().match(/^\|?\s*:?-{3,}/)) {
      const tableLines = [line];
      while (lines[index + 1]?.trim().startsWith('|')) {
        index += 1;
        tableLines.push(lines[index]);
      }
      html.push(renderMarkdownTable(tableLines));
      continue;
    }

    const unordered = line.match(/^\s*[-*]\s+(.+)$/);
    if (unordered) {
      const items = [unordered[1]];
      while (lines[index + 1]?.match(/^\s*[-*]\s+(.+)$/)) {
        index += 1;
        items.push(lines[index].replace(/^\s*[-*]\s+/, ''));
      }
      html.push(`<ul>${items.map((item) => `<li>${renderInlineMarkdown(item)}</li>`).join('')}</ul>`);
      continue;
    }

    const ordered = line.match(/^\s*\d+\.\s+(.+)$/);
    if (ordered) {
      const items = [ordered[1]];
      while (lines[index + 1]?.match(/^\s*\d+\.\s+(.+)$/)) {
        index += 1;
        items.push(lines[index].replace(/^\s*\d+\.\s+/, ''));
      }
      html.push(`<ol>${items.map((item) => `<li>${renderInlineMarkdown(item)}</li>`).join('')}</ol>`);
      continue;
    }

    if (line.startsWith('>')) {
      const quotes = [line.replace(/^>\s?/, '')];
      while (lines[index + 1]?.startsWith('>')) {
        index += 1;
        quotes.push(lines[index].replace(/^>\s?/, ''));
      }
      html.push(`<blockquote>${quotes.map(renderInlineMarkdown).join('<br />')}</blockquote>`);
      continue;
    }

    const paragraph = [line.trim()];
    while (
      lines[index + 1]?.trim() &&
      !lines[index + 1].match(/^(#{2,4})\s+/) &&
      !lines[index + 1].match(/^\s*[-*]\s+/) &&
      !lines[index + 1].match(/^\s*\d+\.\s+/) &&
      !lines[index + 1].trim().startsWith('|') &&
      !lines[index + 1].startsWith('>') &&
      !lines[index + 1].startsWith('```')
    ) {
      index += 1;
      paragraph.push(lines[index].trim());
    }
    html.push(`<p>${renderInlineMarkdown(paragraph.join(' '))}</p>`);
  }

  return html.join('\n');
}

function loadPosts(locales) {
  if (!existsSync(POSTS_DIR)) {
    return new Map();
  }

  const localeSet = new Set(locales.map((entry) => entry.locale));
  const postsByLocale = new Map(locales.map((entry) => [entry.locale, []]));

  for (const filename of readdirSync(POSTS_DIR).filter((entry) => entry.endsWith('.mdx'))) {
    const { locale, slug } = getPostLocaleAndSlug(filename);
    if (!localeSet.has(locale)) {
      continue;
    }

    const { body, frontmatter } = stripFrontmatter(
      readFileSync(path.join(POSTS_DIR, filename), 'utf8')
    );
    postsByLocale.get(locale).push({
      body,
      date: frontmatter.date || frontmatter.created_at || '',
      description: frontmatter.description || '',
      image: frontmatter.image || '',
      keywords: frontmatter.keywords || '',
      locale,
      slug,
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
      title: frontmatter.title || slug,
    });
  }

  for (const [locale, posts] of postsByLocale.entries()) {
    posts.sort((left, right) => {
      const leftPinned = PINNED_BLOG_POST_SLUGS.indexOf(left.slug);
      const rightPinned = PINNED_BLOG_POST_SLUGS.indexOf(right.slug);
      if (leftPinned !== rightPinned) {
        if (leftPinned === -1) return 1;
        if (rightPinned === -1) return -1;
        return leftPinned - rightPinned;
      }
      return Date.parse(right.date || '') - Date.parse(left.date || '');
    });
    postsByLocale.set(locale, posts);
  }

  return postsByLocale;
}

function renderBlogLayout({
  assetPrefix,
  body,
  description,
  htmlLang,
  locale,
  localeNav,
  title,
}) {
  return `<!DOCTYPE html>
<html lang="${escapeHtml(htmlLang)}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="stylesheet" href="${assetPrefix}/assets/styles.css" />
  </head>
  <body>
    <div class="shell">
      <header class="shell-header">
        <a class="brand" href="${assetPrefix}/">SBTI Test</a>
        <nav class="locale-nav" aria-label="Languages">${localeNav}</nav>
      </header>
      <main class="blog-page" data-locale="${escapeHtml(locale)}">
        ${body}
      </main>
    </div>
  </body>
</html>`;
}

function writeBlogIndex(localeEntry, posts, allLocales) {
  const blogCopy = loadJson(path.join(BLOG_DIR, `${localeEntry.locale}.json`));
  const outputDir = getOutputDirForPath(getBlogIndexPath(localeEntry.locale));
  const assetPrefix = getAssetPrefix(outputDir);
  ensureDir(outputDir);

  const section = blogCopy.page.sections.blog;
  const cards = posts
    .map(
      (post) => `
        <article class="blog-card">
          ${post.image ? `<img src="${escapeHtml(post.image)}" alt="" loading="lazy" />` : ''}
          <div>
            <div class="blog-date">${escapeHtml(formatPostDate(post.date, localeEntry.locale))}</div>
            <h2><a href="${escapeHtml(getPostPath(localeEntry.locale, post.slug))}">${escapeHtml(post.title)}</a></h2>
            <p>${escapeHtml(post.description)}</p>
          </div>
        </article>
      `
    )
    .join('');

  const body = `
    <section class="card blog-hero">
      <div class="eyebrow">${escapeHtml(blogCopy.messages.crumb)}</div>
      <h1>${escapeHtml(section.title)}</h1>
      <p class="sub">${escapeHtml(section.description)}</p>
    </section>
    <section class="blog-list">
      ${cards || `<p class="sub">${escapeHtml(blogCopy.messages.no_content)}</p>`}
    </section>
  `;

  const html = renderBlogLayout({
    assetPrefix,
    body,
    description: section.description,
    htmlLang: localeEntry.htmlLang,
    locale: localeEntry.locale,
    localeNav: renderLocaleNav(allLocales, localeEntry.locale),
    title: blogCopy.page.title,
  });
  writeFileSync(path.join(outputDir, 'index.html'), `${html}\n`, 'utf8');
}

function writeBlogPost(localeEntry, post, allLocales) {
  const blogCopy = loadJson(path.join(BLOG_DIR, `${localeEntry.locale}.json`));
  const outputDir = getOutputDirForPath(getPostPath(localeEntry.locale, post.slug));
  const assetPrefix = getAssetPrefix(outputDir);
  ensureDir(outputDir);

  const articleHtml = renderMarkdown(post.body);
  const body = `
    <article class="card blog-detail">
      <a class="blog-back" href="${escapeHtml(getBlogIndexPath(localeEntry.locale))}">${escapeHtml(blogCopy.messages.crumb)}</a>
      <header>
        <div class="blog-date">${escapeHtml(formatPostDate(post.date, localeEntry.locale))}</div>
        <h1>${escapeHtml(post.title)}</h1>
        <p class="sub">${escapeHtml(post.description)}</p>
        ${post.image ? `<img class="blog-cover" src="${escapeHtml(post.image)}" alt="" loading="lazy" />` : ''}
      </header>
      <div class="blog-content">${articleHtml}</div>
    </article>
  `;

  const html = renderBlogLayout({
    assetPrefix,
    body,
    description: post.description,
    htmlLang: localeEntry.htmlLang,
    locale: localeEntry.locale,
    localeNav: renderLocaleNav(allLocales, localeEntry.locale),
    title: post.title,
  });
  writeFileSync(path.join(outputDir, 'index.html'), `${html}\n`, 'utf8');
}

if (!existsSync(path.join(DATA_DIR, 'locales.json'))) {
  throw new Error('Missing src/data/locales.json. Run `npm run sync` first.');
}

const locales = loadJson(path.join(DATA_DIR, 'locales.json'));

removeGeneratedOutputs(locales);
ensureDir(ASSETS_DIR);

cpSync(path.join(TEMPLATE_DIR, 'styles.css'), path.join(ASSETS_DIR, 'styles.css'));
cpSync(path.join(TEMPLATE_DIR, 'app.js'), path.join(ASSETS_DIR, 'app.js'));
cpSync(RUNTIME_SOURCE, path.join(ASSETS_DIR, 'engine.js'));

const template = readFileSync(path.join(TEMPLATE_DIR, 'page.html'), 'utf8');
const postsByLocale = loadPosts(locales);

for (const localeEntry of locales) {
  const content = loadJson(path.join(CONTENT_DIR, `${localeEntry.locale}.json`));
  writePage(localeEntry, content, locales, template);

  const posts = postsByLocale.get(localeEntry.locale) ?? [];
  writeBlogIndex(localeEntry, posts, locales);
  for (const post of posts) {
    writeBlogPost(localeEntry, post, locales);
  }
}
