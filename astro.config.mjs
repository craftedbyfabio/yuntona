import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https://yuntona.ai',
  output: 'static',
  adapter: netlify(),
  integrations: [react()],
  build: {
    inlineStylesheets: 'never',
  },
  experimental: {
    csp: true,
  },
  vite: {
    ssr: {
      noExternal: ['@fontsource-variable/*', '@fontsource/*'],
    },
  },
});
