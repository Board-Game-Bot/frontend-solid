import { createSignal } from 'solid-js';

export const useSignal = <T>(defaultValue?: T) => {
  const [value, setValue] = createSignal(defaultValue);
  return {
    v: value,
    s: setValue,
  };
};