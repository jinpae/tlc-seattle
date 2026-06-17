// @ts-check
import { defineConfig, envField } from 'astro/config';

import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://seattletruelight.church',
  integrations: [react()],
  adapter: vercel(),

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'load',
  },

  vite: {
    plugins: [tailwindcss()]
  },

  env: {
    schema: {
      PUBLIC_SANITY_PROJECT_ID: envField.string({ context: 'client', access: 'public' }),
      PUBLIC_SANITY_DATASET: envField.string({ context: 'client', access: 'public' }),
      YOUTUBE_API_KEY: envField.string({ context: 'server', access: 'secret' }),
    }
  }
});