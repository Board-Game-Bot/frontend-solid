import { Accessor, createEffect, createSignal, Setter } from 'solid-js';

export const createLocalStorageSignal = (key: string): [Accessor<string>, Setter<string>] => {
  const [value, setValue] = createSignal(localStorage.getItem(key) ?? '');

  createEffect(() => {
    localStorage.setItem(key, value());
  });

  return [value, setValue];
};