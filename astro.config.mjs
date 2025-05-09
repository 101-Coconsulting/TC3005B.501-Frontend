// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://astro.build/config
export default defineConfig({
  base: '/',
  server: {
    open: '/dashboard',
  },
  integrations: [react()],
  vite: {
    plugins: [tailwindcss(), basicSsl()],
    server: {
      https: false
    }
  }
});