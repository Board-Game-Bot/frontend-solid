import { defineConfig, presetAttributify, presetMini } from 'unocss';

export default defineConfig({
  presets: [
    presetMini(),
    presetAttributify(),
  ],
  mergeSelectors: false,
  shortcuts: {
    full: 'w-full h-full',
    center: 'flex justify-center items-center',
    hover_black:
      'relative after:content-empty after:absolute after:full after:bg-#3333',
  },
});
