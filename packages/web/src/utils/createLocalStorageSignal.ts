import { createEffect, createSignal } from 'solid-js';

export const createLocalStorageSignal = <T>(key: string, fallbackValue?: T) => {
  const defaultValue = () => {
    const item = localStorage.getItem(key);
    try {
      return JSON.parse(item ?? '');
    }
    catch {
      return item ?? fallbackValue;
    }
  };
  const value = createSignal<T>(defaultValue());

  createEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value[0]()));
    }
    catch {
      localStorage.setItem(key, '');
    }
  });

  return value;
};