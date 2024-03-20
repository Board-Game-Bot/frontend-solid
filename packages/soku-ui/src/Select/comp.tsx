import { createEffect, createMemo, For, JSX, on, Show } from 'solid-js';
import { isUndefined } from 'lodash-es';
import { cx, useSignal } from 'soku-utils';
import { Button, Label } from '../..';

interface Props {
  class?: string;
  width?: number;
  options?: Record<string, JSX.Element> | string[];
  value?: string;
  default?: string;
  onChange?: (value: string) => void;
  name?: string;
  title?: string;
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

  const visible = useSignal(false);

  const insideValue = useSignal(props.value ?? props.default ?? optionArr()[0]);

  const currentValue = createMemo(
    () => isUndefined(props.value) ? insideValue.v() : props.value,
  );

  let buttonRef: HTMLButtonElement;

  const onChange = props.onChange ?? ((record: any) => {
    buttonRef?.dispatchEvent(new CustomEvent('change', {
      detail: record,
      bubbles: true,
    }));
  });

  createEffect(on(insideValue.v, () => {
    const v = insideValue.v();
    if (!isUndefined(v))
      onChange(v);
  }));

  const handleClick = (value: string) => {
    insideValue.s(value);
    visible.s(false);
  };

  return (
    <div class={props.class}>
      <Label name={props.name}>{props.title}</Label>
      <input class={'hidden'} name={props.name} value={currentValue()} />
      <div class={'relative'}>
        <Button
          ref={el => buttonRef = el}
          class={cx('overflow-visible font-normal')}
          variant={'blank'}
          size={props.size ?? 'md'}
          style={{
            width: props.width ? `${props.width}px` : '100%',
          }}
          onClick={() => visible.s(true)}
        >
          {options()[currentValue()!]}
          <Show when={visible.v()}>
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
                      'w-full h-full text-black box-border p-2 px-5 cursor-pointer rounded-2 hover:bg-#eee',
                      'font-normal',
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClick(value);
                    }}
                  >
                    {label}
                  </div>
                }
              </For>
            </div>
          </Show>
        </Button>
      </div>
    </div>
  );
};