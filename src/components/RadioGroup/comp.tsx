import { createEffect, createSignal, For } from 'solid-js';
import { cx } from '@/utils';

interface Props {
  class?: string;
  items: Record<string, string> | string[];
  value?: string;
  defaultValue?: string;
  onChange?: (key: string) => void;
}

export const RadioGroup = (props: Props) => {
  const items = () => 
    Array.isArray(props.items) ? props.items.reduce(
      (p, c) => ({
        ...p,
        [c]: c,
      }),
      {} as Record<string, string>,
    ) : props.items;

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
    <div class={cx('w-fit p-1 flex items-center gap-1 bg-gray/9 rounded-1', props.class)}>
      <For each={Object.entries(items())}>
        {([key, label]) =>
          <div
            class={cx(
              'px-2 py-1 rounded-1 cursor-pointer',
              'transition duration-200',
              'hover:bg-white',
              key === usedValue() && 'bg-white text-#008',
            )}
            onClick={() => handleClick(key)}
          >
            {label}
          </div>
        }
      </For>
    </div>
  );
};