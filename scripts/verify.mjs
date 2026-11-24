import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

const base = (process.env.PORTFOLIO_BASE || '').replace(/^\/?|\/$/g, '');
const prefix = base ? '/' + base : '';
const internalOrigin = process.env.PORTFOLIO_SITE ? new URL(process.env.PORTFOLIO_SITE).origin : 'https://portfolio.test';
const langs = { tr: 'projeler', en: 'projects' };
const requiredFields = ['title', 'problem', 'data', 'method', 'result', 'limits'];
const records = await readdir('src/content/projects');
const projects = await Promise.all(records.filter(file => file.endsWith('.json')).map(async file => {
  const data = JSON.parse(await readFile(join('src/content/projects', file), 'utf8'));
  assert.equal(file, data.id + '.json');
  assert.ok(/^[a-z0-9-]+$/.test(data.id));
  assert.ok(Array.isArray(data.tools) && data.tools.length > 0);
  assert.ok(data.github === null || /^https:\/\/github\.com\//.test(data.github));
  for (const lang of Object.keys(langs)) {
    for (const field of requiredFields) assert.ok(data[lang]?.[field]?.trim(), data.id + ' ' + lang + ' ' + field);
  }
  return data;
}));
for (const category of ['bi', 'ml', 'nlp', 'dl']) {
  assert.ok(projects.some(p => p.category === category), 'Missing category ' + category);
}
assert.ok(projects.length >= 12, 'Expected at least 12 projects');

const files = await readdir('dist', { recursive: true });
const pages = new Map();
for (const file of files) {
  assert.doesNotMatch(file, /(?:^|[\\/])materials(?:[\\/]|$)|\.pbix$|\.ipynb$|Burak_Gokce_CV_Son\.pdf/i);
  if ((await stat(join('dist', file))).isFile() && file.endsWith('.html')) {
    pages.set(file.replaceAll('\\', '/'), await readFile(join('dist', file), 'utf8'));
  }
}
const routeFile = path => path.replace(/^\//, '').replace(/\/$/, '') + '/index.html';
for (const [lang, section] of Object.entries(langs)) {
  const other = lang === 'tr' ? 'en' : 'tr';
  const home = pages.get(lang + '/index.html');
  assert.ok(home?.includes('lang="' + lang + '"'));
  assert.equal([...home.matchAll(/<article\b[^>]*data-category=/g)].length, projects.length);
  const certificates = [...home.matchAll(/data-certificate="([^"]+)"[^>]*>[\s\S]*?<time datetime="([^"]+)"/g)];
  assert.ok(certificates.length >= 7);
  assert.equal(certificates[0][1], 'workintech-data-analyst');
  assert.equal(new Set(certificates.map(([, id]) => id)).size, certificates.length);
  const dates = certificates.slice(1).map(([, , date]) => date);
  assert.deepEqual(dates, [...dates].sort().reverse());
  for (const [, id] of certificates) {
    assert.ok(home.includes('/portfolio-assets/certificates/' + id + '.webp'));
  }
  assert.ok(home.includes(lang === 'tr' ? 'Katılım sertifikası' : 'Certificate of participation'));
  const cv = pages.get(lang + '/cv/index.html');
  assert.ok(cv?.includes('burak-gokce-cv-' + lang + '.pdf') && cv.includes(' download'));
  for (const p of projects) {
    const html = pages.get(routeFile('/' + lang + '/' + section + '/' + p.id));
    assert.ok(html?.includes('lang="' + lang + '"'), p.id);
    assert.ok(html.includes(prefix + '/' + other + '/' + langs[other] + '/' + p.id + '/'), p.id + ' alternate');
    if (p.github) assert.ok(html.includes(p.github));
  }
}
assert.ok(pages.get('index.html')?.includes(prefix + '/tr/'));
assert.ok(pages.has('404.html'));

const external = new Set();
let links = 0;
for (const [file, html] of pages) {
  assert.doesNotMatch(html, /(?:mailto|tel):|\b0?5\d{2}[ .-]+\d{3}[ .-]+\d{2}[ .-]+\d{2}\b/i, file);
  const path = prefix + '/' + file.replace(/index\.html$/, '');
  for (const [, raw] of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const url = new URL(raw.replaceAll('&amp;', '&'), internalOrigin + path);
    if (url.origin !== internalOrigin) {
      assert.equal(url.protocol, 'https:');
      external.add(url.href);
      continue;
    }
    assert.ok(!prefix || url.pathname.startsWith(prefix + '/'), 'Link outside deployment base ' + raw);
    const target = decodeURIComponent(url.pathname.slice(prefix.length + 1));
    const disk = target.endsWith('/') || target === '' ? target + 'index.html' : target;
    assert.ok((await stat(join('dist', disk))).isFile(), file + ' -> ' + raw);
    if (url.hash) {
      const destination = pages.get(disk);
      assert.ok(destination?.includes('id="' + decodeURIComponent(url.hash.slice(1)) + '"'), file + ' -> ' + raw);
    }
    links++;
  }
}
console.log(projects.length + ' projects, ' + pages.size + ' HTML pages, ' + links + ' internal links and assets verified.');
console.log(external.size + ' HTTPS destinations validated for format.');
