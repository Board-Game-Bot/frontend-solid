import { Accessor, createEffect, createSignal, Setter } from 'solid-js';

// FIXME type
export const createLocalStorageSignal = <T>(key: string, fallbackValue?: T): [Accessor<T>, Setter<any>] => {
  const defaultValue = () => {
    const item = localStorage.getItem(key);
    try {
      return JSON.parse(item ?? '');
    }
    catch {
      return item ?? fallbackValue;
    }
  };
  const [value, setValue] = createSignal(defaultValue());

  createEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value()));
    }
    catch {
      localStorage.setItem(key, value());
    }
  });

  return [value, setValue];
};