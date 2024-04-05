import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import uno from 'unocss/vite';
import dts from 'vite-plugin-dts';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
  plugins: [solidPlugin(), uno(), dts({ rollupTypes: true }), cssInjectedByJsPlugin()],
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'index',
      formats: ['es'],
    },
    outDir: './dist',
    minify: false,
    rollupOptions: {
      input: './src/index.ts',
      output: {
        format: 'esm',
        entryFileNames: 'index.esm.js',
        globals: {
          'highlight.js': 'highlight.js',
        },
      },
      external: ['highlight.js'],
    },
  },
});