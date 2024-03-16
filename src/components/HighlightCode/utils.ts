import HL from 'highlight.js';
import { toPairs } from 'lodash-es';
import { REGISTER_MAP } from './constants';

toPairs(REGISTER_MAP).forEach(([lang, fn]) => {
  HL.registerLanguage(lang, fn);
});

export { HL };