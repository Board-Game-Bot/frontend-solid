import { JSX } from 'solid-js';
import { cx, useSignal } from 'soku-utils';
import { Label } from '../index';

interface Props extends Omit<JSX.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  width?: string;
  default?: string;
  onChange?: (value: string[] | string | number) => void;
}

export const TextArea = (props: Props) => {
  const currentValue = useSignal(props.default ?? props.value ?? '');

  return (
    <div class={props.class}>
      <Label name={props.name}>{props.title}</Label>
      <textarea
        {...props}
        value={currentValue.v()}
        class={cx(
          'border-0 outline outline-1 outline-gray focus:outline-2 focus:outline-#006ad6',
          'box-border px-12px py-5px rounded-2',
        )}
        onChange={e => props.onChange?.(currentValue.s(e.target.value))}
        onInput={(e) => props.onChange?.(currentValue.s(e.target.value))}
        style={{ width: props.width, 'aspect-ratio': '2 / 1' }}
      />
    </div>
  );
};
