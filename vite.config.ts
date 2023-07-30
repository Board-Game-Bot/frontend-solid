import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import uno from 'unocss/vite';
import { fileURLToPath } from 'url';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    solid(),
    uno(),
    viteStaticCopy({
      targets: [
        {
          src: './_redirects',
          dest: '',
        },
      ],
    }),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
    ],
  },
  server: {
    port: 5173,
  },
  build: {
    target: 'esnext',
  },
});
