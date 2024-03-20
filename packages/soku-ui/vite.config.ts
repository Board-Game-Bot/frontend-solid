import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import uno from 'unocss/vite';

export default defineConfig({
  plugins: [solidPlugin(), uno()],
});