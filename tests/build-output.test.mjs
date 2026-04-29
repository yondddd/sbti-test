import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

test('deployable static pages exist for root English and every locale folder', () => {
  const rootIndexPath = path.join(repoRoot, 'index.html');
  assert.equal(existsSync(rootIndexPath), true);

  const rootIndex = readFileSync(rootIndexPath, 'utf8');
  assert.match(rootIndex, /SBTI Personality Test/);
  assert.match(rootIndex, /"locale":"en"/);

  const locales = [
    'zh',
    'zh-hant',
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
  ];

  for (const locale of locales) {
    const pagePath = path.join(repoRoot, locale, 'index.html');
    assert.equal(existsSync(pagePath), true, `${locale} page should exist`);
    const html = readFileSync(pagePath, 'utf8');
    assert.match(html, new RegExp(`"locale":"${locale}"`));
    assert.doesNotMatch(html, /\/Users\/yond\/Downloads\/code\//);
  }
});

test('generated pages keep localized type image references inside the static repo', () => {
  const enIndex = readFileSync(path.join(repoRoot, 'index.html'), 'utf8');
  assert.match(enIndex, /sbti\/types\/en\/CTRL\.png/);

  const zhIndex = readFileSync(path.join(repoRoot, 'zh', 'index.html'), 'utf8');
  assert.match(zhIndex, /sbti\/types\/zh\/CTRL\.png/);

  assert.equal(
    existsSync(path.join(repoRoot, 'public', 'sbti', 'types', 'en', 'CTRL.png')),
    true
  );
  assert.equal(
    existsSync(path.join(repoRoot, 'public', 'sbti', 'types', 'zh-hant', 'CTRL.png')),
    true
  );
  assert.equal(existsSync(path.join(repoRoot, 'sbti')), false);
});

test('generated static blog pages exist for every upstream locale', () => {
  const rootBlogPath = path.join(repoRoot, 'blog', 'index.html');
  assert.equal(existsSync(rootBlogPath), true);

  const rootBlog = readFileSync(rootBlogPath, 'utf8');
  assert.match(rootBlog, /SBTI Blog/);
  assert.match(rootBlog, /what-is-sbti/);
  assert.doesNotMatch(rootBlog, /\/Users\/yond\/Downloads\/code\//);

  const rootPostPath = path.join(repoRoot, 'blog', 'what-is-sbti', 'index.html');
  assert.equal(existsSync(rootPostPath), true);
  const rootPost = readFileSync(rootPostPath, 'utf8');
  assert.match(rootPost, /What Is SBTI/);
  assert.doesNotMatch(rootPost, /\/Users\/yond\/Downloads\/code\//);

  for (const locale of ['fr', 'ar']) {
    const blogPath = path.join(repoRoot, locale, 'blog', 'index.html');
    assert.equal(existsSync(blogPath), true, `${locale} blog index should exist`);
    const html = readFileSync(blogPath, 'utf8');
    assert.match(html, /what-is-sbti/);
    assert.doesNotMatch(html, /\/Users\/yond\/Downloads\/code\//);

    const detailPath = path.join(repoRoot, locale, 'blog', 'what-is-sbti', 'index.html');
    assert.equal(existsSync(detailPath), true, `${locale} blog detail should exist`);
    const detailHtml = readFileSync(detailPath, 'utf8');
    assert.match(detailHtml, /SBTI/);
    assert.doesNotMatch(detailHtml, /\/Users\/yond\/Downloads\/code\//);
  }
});
