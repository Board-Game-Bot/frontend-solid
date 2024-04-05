import { createEffect } from 'solid-js';
import { useSignal } from '@soku-solid/utils';

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
  const value = useSignal<string>(defaultValue());

  createEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value.v()));
    }
    catch {
      localStorage.setItem(key, value.v() ?? '');
    }
  });

  return value;
};