import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, '..');
const SOURCE_APP_DIR = process.env.SBTI_SOURCE_APP_DIR;
const SOURCE_TYPES_DIR = path.join(SOURCE_APP_DIR, 'public', 'sbti', 'types');
const TARGET_TYPES_DIR = path.join(REPO_ROOT, 'public', 'sbti', 'types');
const TARGET_DATA_DIR = path.join(REPO_ROOT, 'src', 'data');
const TARGET_CONTENT_DIR = path.join(TARGET_DATA_DIR, 'content');
const EXPORT_PROGRAM = `
import { appLocales, localeNames } from '@repo/i18n-core/locale-policy';
import { sbtiGenerated, getSbtiCopy } from '#features/sbti/lib/data.ts';
import { getSbtiPageCopy } from '#features/sbti/lib/page-copy.ts';

const payload = {
  defaultLocale: sbtiGenerated.defaultLocale,
  dimensionOrder: [...sbtiGenerated.dimensionOrder],
  drunkTriggerQuestionId: sbtiGenerated.drunkTriggerQuestionId,
  localeNames,
  locales: [...appLocales],
  normalTypes: [...sbtiGenerated.normalTypes],
  publicTypeImages: { ...sbtiGenerated.publicTypeImages },
  content: Object.fromEntries(
    appLocales.map((locale) => {
      const copy = getSbtiCopy(locale);
      return [
        locale,
        {
          chrome: copy.chrome,
          dimensionMeta: copy.dimensionMeta,
          dimExplanations: copy.dimExplanations,
          pageCopy: getSbtiPageCopy(locale),
          questions: copy.questions,
          specialQuestions: copy.specialQuestions,
          typeLibrary: copy.typeLibrary,
        },
      ];
    })
  ),
};

process.stdout.write(JSON.stringify(payload));
`;
const TEMP_EXPORT_SCRIPT = path.join(SOURCE_APP_DIR, '.sbti-static-export.tmp.ts');

const HTML_LANG_BY_LOCALE = {
  zh: 'zh-CN',
  'zh-hant': 'zh-Hant',
  en: 'en',
  ja: 'ja',
  ko: 'ko',
  es: 'es',
  ru: 'ru',
  hi: 'hi',
  de: 'de',
  th: 'th',
  vi: 'vi',
  id: 'id',
  ms: 'ms',
};

function ensureDir(dirPath) {
  mkdirSync(dirPath, { recursive: true });
}

function readExportPayload() {
  writeFileSync(TEMP_EXPORT_SCRIPT, EXPORT_PROGRAM, 'utf8');
  const result = spawnSync(
    'pnpm',
    [
      '--dir',
      SOURCE_APP_DIR,
      'exec',
      'tsx',
      '--tsconfig',
      'tsconfig.json',
      TEMP_EXPORT_SCRIPT,
    ],
    {
      cwd: SOURCE_APP_DIR,
      encoding: 'utf8',
    }
  );

  rmSync(TEMP_EXPORT_SCRIPT, { force: true });

  if (result.status !== 0) {
    throw new Error(result.stderr || 'Failed to export source SBTI data.');
  }

  return JSON.parse(result.stdout);
}

function getOfficialHomeUrl(locale) {
  return locale === 'zh'
    ? 'https://www.sbti-test.org/'
    : `https://www.sbti-test.org/${locale}`;
}

function getOfficialTestUrl(locale) {
  return locale === 'zh'
    ? 'https://www.sbti-test.org/test'
    : `https://www.sbti-test.org/${locale}/test`;
}

function getRepoPath(locale) {
  return locale === 'en' ? '/' : `/${locale}/`;
}

function createImageMap(locale, publicTypeImages) {
  const localeDir = path.join(SOURCE_TYPES_DIR, locale);
  const actualFiles = new Set(readdirSync(localeDir));

  return Object.fromEntries(
    Object.entries(publicTypeImages).map(([code, sourcePath]) => {
      const originalFilename = sourcePath.split('/').at(-1);
      const pngFilename = originalFilename.replace(/\.\w+$/, '.png');
      const filename = actualFiles.has(pngFilename) ? pngFilename : originalFilename;
      return [code, `/sbti/types/${locale}/${filename}`];
    })
  );
}

function syncImages(locales) {
  rmSync(TARGET_TYPES_DIR, { force: true, recursive: true });
  ensureDir(TARGET_TYPES_DIR);

  for (const locale of locales) {
    cpSync(path.join(SOURCE_TYPES_DIR, locale), path.join(TARGET_TYPES_DIR, locale), {
      recursive: true,
    });
  }
}

function buildMeta(locale, pageCopy) {
  return {
    description: pageCopy.intro.heroSubtitle,
    title: pageCopy.intro.heroTitle,
    urlPath: getRepoPath(locale),
  };
}

function writeJson(filePath, value) {
  writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

ensureDir(TARGET_CONTENT_DIR);

if (!SOURCE_APP_DIR) {
  throw new Error(
    'Missing SBTI_SOURCE_APP_DIR. Set it to the app directory that contains the multilingual SBTI source data.'
  );
}

if (!existsSync(path.join(SOURCE_APP_DIR, 'package.json'))) {
  throw new Error(`Missing SBTI source app directory: ${SOURCE_APP_DIR}`);
}

const payload = readExportPayload();
syncImages(payload.locales);

const localeManifest = payload.locales.map((locale) => ({
  htmlLang: HTML_LANG_BY_LOCALE[locale] ?? locale,
  locale,
  nativeName: payload.localeNames[locale],
  officialHomeUrl: getOfficialHomeUrl(locale),
  officialTestUrl: getOfficialTestUrl(locale),
  repoPath: getRepoPath(locale),
}));

writeJson(path.join(TARGET_DATA_DIR, 'locales.json'), localeManifest);

for (const locale of payload.locales) {
  const localeContent = payload.content[locale];
  const content = {
    chrome: localeContent.chrome,
    defaultLocale: payload.defaultLocale,
    dimensionMeta: localeContent.dimensionMeta,
    dimensionOrder: payload.dimensionOrder,
    dimExplanations: localeContent.dimExplanations,
    drunkTriggerQuestionId: payload.drunkTriggerQuestionId,
    imagePaths: createImageMap(locale, payload.publicTypeImages),
    locale,
    meta: buildMeta(locale, localeContent.pageCopy),
    normalTypes: payload.normalTypes,
    pageCopy: localeContent.pageCopy,
    questions: localeContent.questions,
    specialQuestions: localeContent.specialQuestions,
    typeLibrary: localeContent.typeLibrary,
  };
  writeJson(path.join(TARGET_CONTENT_DIR, `${locale}.json`), content);
}

const sourceContract = {
  assetRoot: 'public/sbti/types',
  generatedAt: new Date().toISOString(),
  localeCount: payload.locales.length,
  maintainerWorkflow: 'npm run sync',
};

writeJson(path.join(TARGET_DATA_DIR, 'source-contract.json'), sourceContract);
