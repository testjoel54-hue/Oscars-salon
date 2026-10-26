import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  base: '/',
  server: { host: '0.0.0.0' },
  build: {
    rollupOptions: {
      input: {
        english: fileURLToPath(new URL('./index.html', import.meta.url)),
        vietnamese: fileURLToPath(new URL('./vi/index.html', import.meta.url)),
      },
    },
  },
});
