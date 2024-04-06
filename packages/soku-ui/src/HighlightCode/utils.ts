import HL, { LanguageFn } from 'highlight.js';
import { toPairs } from 'lodash-es';
import { REGISTER_MAP } from './constants';

const ENTITIES = toPairs(REGISTER_MAP) as [string, LanguageFn][];
ENTITIES.forEach(([lang, fn]) => {
  HL.registerLanguage(lang, fn);
});

export { HL };