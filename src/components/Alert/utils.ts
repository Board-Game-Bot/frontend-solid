import { Accessor, createSignal } from 'solid-js';

export const useAlert = (ms?: number): [Accessor<boolean>, () => void] => {
  const [visible, setVisible] = createSignal(false);

  const trigger = () => {
    if (visible())
      return ;
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, ms ?? 3000);
  };

  return [visible, trigger];
};