import { JSX, onMount } from 'solid-js';
import { HL } from './utils';
import { RegisteredLang } from './types';

import 'highlight.js/styles/github.css';

interface Props extends JSX.HTMLAttributes<HTMLPreElement> {
  lang: RegisteredLang;
}

export type { Props as HighlightCodeProps };
export * from './types';

export const HighlightCode = (props: Props) => {
  let preRef: HTMLPreElement;

  onMount(() => {
    HL.highlightElement(preRef);
  });

  return (
    <pre ref={el => preRef = el} {...props} />
  );
};
