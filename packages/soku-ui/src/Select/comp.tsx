import { createEffect, createMemo, createSignal, For, JSX, on, Show } from 'solid-js';
import { isUndefined } from 'lodash-es';
import { cx } from '@soku-solid/utils';
import { Button } from '../Button';
import { ChangeValue } from '../common.types';

interface Props extends ChangeValue<string> {
  class?: string;
  width?: string;
  options?: Record<string, JSX.Element> | string[];
  default?: string;
  size?: 'sm' | 'md' | 'lg';
}

export type { Props as SelectProps };

export const Select = (props: Props) => {
  const options = () => {
    if (Array.isArray(props.options))
      return props.options.reduce((map, option) => {
        map[option] = option;
        return map;
      }, {} as Record<string, JSX.Element>);
    return props.options ?? {};
  };

  const optionArr = () => Object.keys(options());

  const visible = createSignal(false);
  const insideValue = createSignal(props.value ?? props.default ?? optionArr()[0]);

  const currentValue = createMemo(
    () => isUndefined(props.value) ? insideValue[0]() : props.value,
  );

  createEffect(on(insideValue[0], () => {
    const v = insideValue[0]();
    if (!isUndefined(v))
      props.onChange?.(v);
  }));

  const handleClick = (value: string) => {
    insideValue[1](value);
    visible[1](false);
  };

  return (
    <div class={props.class}>
      <input class={'hidden'} value={currentValue()} />
      <div class={'relative'} style={{ width: props.width }}>
        <Button
          class={cx('overflow-visible font-normal w-full')}
          variant={'blank'}
          size={props.size ?? 'md'}
          onClick={() => visible[1](true)}
        >
          {options()[currentValue()!]}
        </Button>
        <Show when={visible[0]()}>
          <div
            class={cx(
              'bg-white',
              'absolute min-w-full max-h-300px z-100 top-120% left-0 rounded-2 overflow-auto shadow-lg shadow-#ddd',
              'box-border p-2',
              'outline-1 outline-solid outline-#ccc',
            )}
          >
            <For each={Object.entries(options())}>
              {([value, label]) =>
                <div
                  class={cx(
                    'w-full h-full text-black box-border p-2 px-5 text-16px cursor-pointer rounded-2 hover:bg-#eee',
                    'font-normal',
                  )}
                  onClick={() => handleClick(value)}
                >
                  {label}
                </div>
              }
            </For>
          </div>
        </Show>
      </div>
    </div>
  );
};