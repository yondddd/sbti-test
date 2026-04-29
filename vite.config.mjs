import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';

const repoRoot = process.cwd();
const locales = JSON.parse(
  readFileSync(path.join(repoRoot, 'src', 'data', 'locales.json'), 'utf8')
);

function collectHtmlInputs(dir, prefix = '') {
  if (!existsSync(dir)) {
    return [];
  }

  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(dir, entry.name);
    const key = prefix ? `${prefix}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      if (entry.name === 'dist' || entry.name === 'node_modules' || entry.name === 'public') {
        return [];
      }
      return collectHtmlInputs(absolutePath, key);
    }

    return entry.name === 'index.html' ? [[key.replace(/\/index\.html$/, '') || 'index', absolutePath]] : [];
  });
}

const quizInput = Object.fromEntries(
  locales.map((entry) => [
    entry.locale,
    entry.locale === 'en'
      ? path.join(repoRoot, 'index.html')
      : path.join(repoRoot, entry.locale, 'index.html'),
  ])
);

const input = {
  ...quizInput,
  ...Object.fromEntries(collectHtmlInputs(repoRoot)),
};

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input,
    },
  },
});
