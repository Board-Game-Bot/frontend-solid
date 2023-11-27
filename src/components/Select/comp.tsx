import { createEffect, For, JSX, Show } from 'solid-js';
import { isUndefined } from 'lodash-es';
import { Button, Label } from '@/components';
import { cx, signal } from '@/utils';

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

  const visible = signal(false);

  const insideValue = signal(props.default ?? props.value ?? optionArr()[0]);

  const currentValue = () => isUndefined(props.value) ? insideValue() : props.value;

  let buttonRef: HTMLButtonElement;

  createEffect(() => {
    const v = currentValue();
    const {
      onChange = (record: any) => {
        buttonRef?.dispatchEvent(new CustomEvent('change', {
          detail: record,
          bubbles: true,
        }));
      },
    } = props;
    if (!isUndefined(v))
      onChange(v);
  });

  const handleClick = (value: string) => {
    insideValue(value);
    visible(false);
  };

  return (
    <div class={props.class}>
      <Label name={props.name}>{props.title}</Label>
      <input class={'hidden'} name={props.name} value={currentValue()} />
      <div class={'w-fit relative'}>
        <Button
          ref={el => buttonRef = el}
          class={cx('overflow-visible font-normal')}
          variant={'blank'}
          size={props.size ?? 'md'}
          style={{
            width: props.width ? `${props.width}px` : '100%',
          }}
          onClick={() => visible(true)}
        >
          {options()[currentValue()]}
          <Show when={visible()}>
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