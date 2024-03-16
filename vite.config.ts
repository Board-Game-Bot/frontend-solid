import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import uno from 'unocss/vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import tsconfigPaths from 'vite-tsconfig-paths';

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
    tsconfigPaths(),
  ],
  server: {
    port: 5173,
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  build: {
    target: 'esnext',
  },
});
