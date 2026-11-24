import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: process.env.PORTFOLIO_SITE,
  base: process.env.PORTFOLIO_BASE || '/',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
