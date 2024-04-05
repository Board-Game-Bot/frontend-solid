import { createEffect, createSignal, For } from 'solid-js';
import { toPairs } from 'lodash-es';
import { cx } from '@soku-solid/utils';
import { Button } from '../Button';
import style from './index.module.scss';

interface Props {
  class?: string;
  items: Record<string, string> | string[];
  value?: string;
  defaultValue?: string;
  onChange?: (key: string) => void;
}

export const RadioGroup = (props: Props) => {
  const items = (): Record<string, string> =>
    Array.isArray(props.items) ? props.items.reduce(
      (p, c) => ({
        ...p,
        [c]: c,
      }),
      {} as Record<string, string>,
    ) : props.items;

  const entries = () => toPairs(items());

  const [current, setCurrent] = createSignal(props.defaultValue ?? Object.keys(items())[0]);

  const usedValue = () => props.value ?? current();
  
  createEffect(() => props.value && setCurrent(props.value));

  const handleClick = (key: string) => {
    if (current() !== key) {
      props.onChange?.(key);
      setCurrent(key);
    }
  };

  return (
    <div class={cx('flex', style.btnGroup)}>
      <For each={entries()}>
        {([key, label]) =>
          <Button
            onClick={() => handleClick(key)}
            active={usedValue() === key}
          >
            {label}
          </Button>
        }
      </For>
    </div>
  );
};