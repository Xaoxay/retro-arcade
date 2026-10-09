import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: {
    host: '127.0.0.1',
    port: 3000
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});
