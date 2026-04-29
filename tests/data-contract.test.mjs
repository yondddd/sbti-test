import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

test('locale manifest mirrors the upstream 14-locale static site contract', () => {
  const localeManifestPath = path.join(repoRoot, 'src', 'data', 'locales.json');
  assert.equal(existsSync(localeManifestPath), true);

  const locales = JSON.parse(readFileSync(localeManifestPath, 'utf8'));
  assert.equal(locales.length, 14);

  const localeCodes = locales.map((entry) => entry.locale);
  assert.deepEqual(localeCodes, [
    'zh',
    'zh-hant',
    'en',
    'ja',
    'ko',
    'es',
    'fr',
    'ru',
    'de',
    'th',
    'vi',
    'id',
    'ms',
    'ar',
  ]);

  for (const entry of locales) {
    assert.equal(typeof entry.nativeName, 'string');
    assert.equal(typeof entry.repoPath, 'string');
    assert.equal(typeof entry.officialHomeUrl, 'string');
    assert.equal(typeof entry.officialTestUrl, 'string');
    assert.equal(typeof entry.htmlLang, 'string');
  }
});

test('localized content is materialized as repo-local JSON for every locale', () => {
  const contentDir = path.join(repoRoot, 'src', 'data', 'content');
  assert.equal(existsSync(contentDir), true);

  const files = readdirSync(contentDir).filter((entry) => entry.endsWith('.json')).sort();
  assert.deepEqual(files, [
    'ar.json',
    'de.json',
    'en.json',
    'es.json',
    'fr.json',
    'id.json',
    'ja.json',
    'ko.json',
    'ms.json',
    'ru.json',
    'th.json',
    'vi.json',
    'zh-hant.json',
    'zh.json',
  ]);

  const sample = JSON.parse(readFileSync(path.join(contentDir, 'en.json'), 'utf8'));
  assert.equal(typeof sample.meta.title, 'string');
  assert.equal(Array.isArray(sample.questions), true);
  assert.equal(Array.isArray(sample.specialQuestions), true);
  assert.equal(typeof sample.typeLibrary, 'object');
  assert.equal(typeof sample.pageCopy.intro.heroTitle, 'string');
});

test('blog source and localized blog copy are synced for every upstream locale', () => {
  const blogDir = path.join(repoRoot, 'src', 'data', 'blog');
  const postsDir = path.join(repoRoot, 'src', 'data', 'posts');
  assert.equal(existsSync(blogDir), true);
  assert.equal(existsSync(postsDir), true);

  const blogFiles = readdirSync(blogDir).filter((entry) => entry.endsWith('.json')).sort();
  assert.deepEqual(blogFiles, [
    'ar.json',
    'de.json',
    'en.json',
    'es.json',
    'fr.json',
    'id.json',
    'ja.json',
    'ko.json',
    'ms.json',
    'ru.json',
    'th.json',
    'vi.json',
    'zh-hant.json',
    'zh.json',
  ]);

  const posts = readdirSync(postsDir).filter((entry) => entry.endsWith('.mdx'));
  assert.equal(posts.length, 154);
  assert.ok(posts.includes('what-is-sbti.en.mdx'));
  assert.ok(posts.includes('what-is-sbti.fr.mdx'));
  assert.ok(posts.includes('what-is-sbti.ar.mdx'));

  const enBlog = JSON.parse(readFileSync(path.join(blogDir, 'en.json'), 'utf8'));
  assert.equal(typeof enBlog.page.sections.blog.title, 'string');
  assert.equal(typeof enBlog.messages.toc, 'string');
});

test('quiz engine stays data-driven and yields the same type across locales', async () => {
  const enginePath = path.join(repoRoot, 'src', 'runtime', 'engine.mjs');
  assert.equal(existsSync(enginePath), true);

  const { computeResult } = await import(enginePath);
  const contentDir = path.join(repoRoot, 'src', 'data', 'content');
  const answerSet = Object.freeze({
    q1: 3,
    q2: 3,
    q3: 3,
    q4: 3,
    q5: 3,
    q6: 3,
    q7: 3,
    q8: 3,
    q9: 3,
    q10: 3,
    q11: 3,
    q12: 3,
    q13: 3,
    q14: 3,
    q15: 3,
    q16: 3,
    q17: 3,
    q18: 3,
    q19: 3,
    q20: 3,
    q21: 3,
    q22: 3,
    q23: 3,
    q24: 3,
    q25: 3,
    q26: 3,
    q27: 3,
    q28: 3,
    q29: 1,
    q30: 1,
    drink_gate_q1: 1,
  });

  const codes = [];
  for (const filename of readdirSync(contentDir).filter((entry) => entry.endsWith('.json')).sort()) {
    const content = JSON.parse(readFileSync(path.join(contentDir, filename), 'utf8'));
    const result = computeResult({
      answers: answerSet,
      normalTypes: content.normalTypes,
      questions: content.questions,
      typeLibrary: content.typeLibrary,
      dimensionMeta: content.dimensionMeta,
      dimensionOrder: content.dimensionOrder,
      drunkTriggerQuestionId: content.drunkTriggerQuestionId,
    });
    codes.push(result.finalType.code);
  }

  assert.deepEqual(new Set(codes).size, 1);
});
