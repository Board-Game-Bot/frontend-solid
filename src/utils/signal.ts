import { createSignal } from 'solid-js';
import { isUndefined } from 'lodash-es';

export type Signal<T> = (value?: T) => T;

export const signal = <T>(defaultValue?: T): Signal<T> => {
  const [value, setValue] = createSignal<T | undefined>(defaultValue);

  return ((_value?: T) => {
    if (isUndefined(_value)) {
      return value();
    }
    else {
      return setValue(() => _value);
    }
  }) as Signal<T>;
};