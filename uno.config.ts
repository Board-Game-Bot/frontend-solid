import { defineConfig } from 'unocss';

export default defineConfig({
  mergeSelectors: false,
  shortcuts: {
    full: 'w-full h-full',
    center: 'flex justify-center items-center',
  },
});
