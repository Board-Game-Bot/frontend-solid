import cpp from 'highlight.js/lib/languages/cpp';
import java from 'highlight.js/lib/languages/java';
import go from 'highlight.js/lib/languages/go';
import python from 'highlight.js/lib/languages/python';
import { LanguageFn } from 'highlight.js';

export const REGISTER_MAP: Record<string, LanguageFn> = {
  cpp,
  java,
  go,
  python,
};

