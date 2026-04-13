import { readFileSync } from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';

const repoRoot = process.cwd();
const locales = JSON.parse(
  readFileSync(path.join(repoRoot, 'src', 'data', 'locales.json'), 'utf8')
);

const input = Object.fromEntries(
  locales.map((entry) => [
    entry.locale,
    entry.locale === 'en'
      ? path.join(repoRoot, 'index.html')
      : path.join(repoRoot, entry.locale, 'index.html'),
  ])
);

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input,
    },
  },
});
