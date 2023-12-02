import { createSignal } from 'solid-js';
import { isUndefined } from 'lodash-es';

export const signal = <T>(defaultValue?: T) => {
  const [value, setValue] = createSignal<T | undefined>(defaultValue);

  return (_value?: T) => {
    if (isUndefined(_value)) {
      return value();
    }
    else {
      return setValue(() => _value);
    }
  };
};