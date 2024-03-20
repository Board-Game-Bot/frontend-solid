import { Accessor, createSignal } from 'solid-js';

export const useToggle = <T>(values: [T, T], defValue?: T): [Accessor<T>, () => void, Accessor<T>] => {
  const [value, setValue] = createSignal<T>(defValue ?? values[0]);
  const other = () => value() === values[0] ? values[1] : values[0];

  const toggle = () => setValue(() => other());
  return [value, toggle, other];
};