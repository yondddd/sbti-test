import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

test('package scripts expose a standard vite workflow', () => {
  const packageJson = JSON.parse(
    readFileSync(path.join(repoRoot, 'package.json'), 'utf8')
  );

  assert.equal(packageJson.scripts.dev, 'vite');
  assert.match(packageJson.scripts.build, /vite build/);
  assert.equal(packageJson.scripts.preview, 'vite preview');
  assert.equal(existsSync(path.join(repoRoot, 'vite.config.mjs')), true);
});
