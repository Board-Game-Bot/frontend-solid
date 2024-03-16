import { defineConfig, presetAttributify, presetUno, presetIcons } from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
  ],
  mergeSelectors: false,
  shortcuts: {
    full: 'w-full h-full',
    center: 'flex justify-center items-center',
    'hover_black': 'transition relative overflow-hidden after:transition after:content-empty after:full after:absolute after:top-0 after:left-0 hover:after:bg-#0001 active:after:bg-#0003',
  },
});
