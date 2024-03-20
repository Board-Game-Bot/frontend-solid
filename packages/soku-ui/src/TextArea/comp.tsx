import { createEffect, JSX } from 'solid-js';
import { isNumber, isString } from 'lodash-es';
import { cx, useSignal } from 'soku-utils';
import { Label } from '../index';

interface Props extends Omit<JSX.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  width?: number | string;
  default?: string;
  onChange?: (value: string[] | string | number) => void;
}

export const TextArea = (props: Props) => {
  const currentValue = useSignal(props.default ?? props.value ?? '');

  let divRef: HTMLDivElement;

  createEffect(() => {
    const v = currentValue.v();
    const {
      onChange = (v: string | number | string[]) => {
        divRef.dispatchEvent(new CustomEvent('change', {
          bubbles: true,
          detail: v,
        }));
      },
    } = props;
    onChange(v!);
  });

  return (
    <div ref={el => divRef = el} class={props.class}>
      <Label name={props.name}>{props.title}</Label>
      <textarea
        {...props}
        value={currentValue.v()}
        class={cx(
          'border-0 outline outline-1 outline-gray focus:outline-2 focus:outline-#006ad6',
          'box-border px-12px py-5px rounded-2',
        )}
        onChange={e => currentValue.s(e.target.value)}
        onInput={(e) => currentValue.s(e.target.value)}
        style={{
          width: isString(props.width)
            ? props.width
            : isNumber(props.width)
              ? `${props.width}px`
              : undefined,
          'aspect-ratio': '2 / 1',
        }}
      />
    </div>
  );
};
