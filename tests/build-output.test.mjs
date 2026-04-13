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
    'ru',
    'hi',
    'de',
    'th',
    'vi',
    'id',
    'ms',
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
