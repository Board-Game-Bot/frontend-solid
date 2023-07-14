import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import eslint from 'vite-plugin-eslint2';

export default defineConfig({
  plugins: [solid(), eslint()],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
