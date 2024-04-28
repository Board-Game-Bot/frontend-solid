import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({ rollupTypes: true }),
  ],
  build: {
    lib: {
      entry: './src/index.tsx',
      name: 'index',
      formats: ['es'],
    },
    outDir: './dist',
    minify: true,
    rollupOptions: {
      input: './src/index.tsx',
      output: {
        format: 'esm',
        entryFileNames: 'index.esm.js',
      },
      external: ['solid-js'],
    },
  },
});