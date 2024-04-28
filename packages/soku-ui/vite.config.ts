import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import uno from 'unocss/vite';
import dts from 'vite-plugin-dts';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
  plugins: [
    solidPlugin(),
    uno(),
    dts({ rollupTypes: true }),
    cssInjectedByJsPlugin(),
  ],
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  build: {
    lib: {
      entry: './index.ts',
      name: 'index',
      formats: ['es'],
    },
    outDir: './dist',
    minify: false,
    rollupOptions: {
      input: './index.ts',
      output: {
        format: 'esm',
        entryFileNames: 'index.esm.js',
      },
      external: ['solid-js', 'highlight.js'],
    },
  },
});