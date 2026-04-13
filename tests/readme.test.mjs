import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const blockedProvenanceTerms = new RegExp(
  [
    'cr' + 'awl',
    'cr' + 'awled',
    'scr' + 'ape',
    'scr' + 'aped',
    'exp' + 'anded',
    'original' + ' page',
    'source' + ' material',
  ].join('|'),
  'i'
);

test('README is English-first and includes multilingual jump links plus official URLs', () => {
  const readmePath = path.join(repoRoot, 'README.md');
  assert.equal(existsSync(readmePath), true);

  const readme = readFileSync(readmePath, 'utf8');
  const localizedDocs = [
    'README.zh-CN.md',
    'README.zh-Hant.md',
    'README.ja.md',
    'README.ko.md',
    'README.es.md',
    'README.ru.md',
    'README.hi.md',
    'README.de.md',
    'README.th.md',
    'README.vi.md',
    'README.id.md',
    'README.ms.md',
  ];

  assert.match(readme, /^# SBTI Test/m);
  assert.match(readme, /\[English\]\(\.\/README\.md\)/);
  assert.match(readme, /\[简体中文\]\(\.\/README\.zh-CN\.md\)/);
  assert.match(readme, /\[繁體中文\]\(\.\/README\.zh-Hant\.md\)/);
  assert.match(readme, /\[日本語\]\(\.\/README\.ja\.md\)/);
  assert.match(readme, /## Overview/);
  assert.match(readme, /## Languages/);
  assert.match(readme, /## Official Website Links/);
  assert.match(readme, /## Features/);
  assert.match(readme, /## Project Structure/);
  assert.match(readme, /## Getting Started/);
  assert.match(readme, /## Development \/ Build/);
  assert.match(readme, /## Project Contents/);
  assert.match(readme, /## Localization/);
  assert.match(readme, /## License/);
  assert.match(readme, /## Acknowledgments/);
  assert.match(readme, /https:\/\/www\.sbti-test\.org\/test/);
  assert.match(readme, /https:\/\/www\.sbti-test\.org\/en\/test/);
  assert.match(readme, /https:\/\/www\.sbti-test\.org\/zh-hant\/test/);
  assert.match(readme, /https:\/\/www\.sbti-test\.org\/ms\/test/);
  assert.match(readme, /npm run dev/);
  assert.match(readme, /vite preview/);
  assert.match(readme, /Separate project introductions are available in dedicated language files linked above\./);
  assert.doesNotMatch(readme, /python3 -m http\.server/);
  assert.doesNotMatch(readme, blockedProvenanceTerms);
  assert.doesNotMatch(readme, /\/Users\/yond|\/Users\//);

  for (const file of localizedDocs) {
    const docPath = path.join(repoRoot, file);
    assert.equal(existsSync(docPath), true, `${file} should exist`);
  }
});

test('localized README files exist and keep official locale links', () => {
  const docs = [
    ['README.zh-CN.md', 'https://www.sbti-test.org/test'],
    ['README.zh-Hant.md', 'https://www.sbti-test.org/zh-hant/test'],
    ['README.ja.md', 'https://www.sbti-test.org/ja/test'],
    ['README.ko.md', 'https://www.sbti-test.org/ko/test'],
    ['README.es.md', 'https://www.sbti-test.org/es/test'],
    ['README.ru.md', 'https://www.sbti-test.org/ru/test'],
    ['README.hi.md', 'https://www.sbti-test.org/hi/test'],
    ['README.de.md', 'https://www.sbti-test.org/de/test'],
    ['README.th.md', 'https://www.sbti-test.org/th/test'],
    ['README.vi.md', 'https://www.sbti-test.org/vi/test'],
    ['README.id.md', 'https://www.sbti-test.org/id/test'],
    ['README.ms.md', 'https://www.sbti-test.org/ms/test'],
  ];

  for (const [file, officialTestUrl] of docs) {
    const contents = readFileSync(path.join(repoRoot, file), 'utf8');
    assert.match(contents, /^# SBTI Test/m);
    assert.match(contents, /\[English\]\(\.\/README\.md\)/);
    assert.match(contents, /npm run dev/);
    assert.match(contents, new RegExp(officialTestUrl.replaceAll('.', '\\.').replaceAll('/', '\\/')));
    assert.doesNotMatch(contents, /python3 -m http\.server/);
    assert.doesNotMatch(contents, blockedProvenanceTerms);
    assert.doesNotMatch(contents, /\/Users\/yond|\/Users\//);
  }
});
