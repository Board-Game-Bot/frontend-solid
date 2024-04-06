// @ts-nocheck
import { isObject, keysIn } from 'lodash-es';

export const cx = (...className: (string | false | Record<string, boolean | undefined> | undefined)[]) => {
  const res = className.map(x => {
    if (isObject(x)) {
      const keys = keysIn(x);
      const result = keys.map(key => x[key] ? key : '').filter(Boolean).join(' ');
      return result;
    }
    return x;
  }).filter(x => x).join(' ');
  return res;
};