import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { lstat, readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const rootFiles = new Set([
  '.gitignore', '.github/workflows/pages.yml', 'README.md', 'astro.config.mjs',
  'package.json', 'pnpm-lock.yaml', 'pnpm-workspace.yaml',
]);
const publicAsset = /^portfolio-assets\/(?:(?:certificates\/)?[a-z0-9-]+\.webp|burak-gokce-cv-(?:tr|en)\.pdf)$/;
const siteSource = /^src\/(?:[\w.[\]-]+\/)*[\w.[\]-]+\.(?:astro|css|json|ts)$/;
const outputFile = /^(?:(?:[a-z0-9-]+\/)*index\.html|404\.html|_astro\/[\w.-]+\.(?:js|css))$/;
const credential = /-----BEGIN (?:[A-Z]+ )?PRIVATE KEY-----|\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,}|(?:AKIA|ASIA)[A-Z0-9]{16})\b|https?:\/\/[^\s/@:]+:[^\s/@]+@/;

async function check(files, directory, allowed) {
  assert.ok(files.length, 'No release files found');
  for (const path of files) {
    assert.ok(allowed(path), 'Unexpected release path: ' + path);
    const file = join(directory, path);
    assert.ok((await lstat(file)).isFile(), 'Expected a regular release file: ' + path);
    if (!/\.(?:pdf|webp)$/.test(path)) {
      const content = await readFile(file, 'utf8');
      assert.ok(!credential.test(content), 'Credential pattern in ' + path);
    }
  }
  console.log(files.length + ' release files passed the path and credential checks.');
}

const mode = process.argv[2];
if (mode === '--output') {
  const files = [];
  for (const entry of await readdir('dist', { recursive: true, withFileTypes: true })) {
    if (!entry.isDirectory()) {
      files.push(join(entry.parentPath, entry.name).slice(5).replaceAll('\\', '/'));
    }
  }
  await check(files, 'dist', path => outputFile.test(path) || publicAsset.test(path));
} else {
  assert.ok(mode === '--tracked' || mode === '--candidate', 'Use --tracked, --candidate or --output');
  const args = mode === '--tracked' ? ['--cached'] : ['--cached', '--others', '--exclude-standard'];
  const files = [...new Set(execFileSync('git', ['ls-files', '-z', ...args], { encoding: 'utf8' }).split('\0').filter(Boolean))];
  await check(files, '.', path => rootFiles.has(path) || siteSource.test(path)
    || /^scripts\/[a-z-]+\.mjs$/.test(path) || path.startsWith('public/') && publicAsset.test(path.slice(7)));
  if (mode === '--candidate') console.log(files.sort().join('\n'));
}
