import { createSignal, JSX } from 'solid-js';
import { cx } from '@soku-solid/utils';

interface Props extends Omit<JSX.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  width?: string;
  default?: string;
  onChange?: (value: string[] | string | number) => void;
}

export const TextArea = (props: Props) => {
  const currentValue = createSignal(props.default ?? props.value ?? '');

  return (
    <div class={props.class}>
      <textarea
        {...props}
        value={currentValue[0]()}
        class={cx(
          'border-0 outline outline-1 outline-gray focus:outline-2 focus:outline-#006ad6',
          'box-border px-12px py-5px rounded-2',
        )}
        onChange={e => props.onChange?.(currentValue[1](e.target.value))}
        onInput={(e) => props.onChange?.(currentValue[1](e.target.value))}
        style={{ width: props.width, 'aspect-ratio': '2 / 1' }}
      />
    </div>
  );
};
