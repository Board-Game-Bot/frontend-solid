import { createEffect, JSX, splitProps } from 'solid-js';
import { cx, useSignal } from 'soku-utils';
import { Label } from '../..';

interface Props extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  default?: string;
  value?: string;
  onChange?: (value?: string) => void;
}

export const Input = (_props: Props) => {
  const [props2, props] = splitProps(_props, ['onChange']);
  const currentValue = useSignal(props.default);

  let divRef: HTMLDivElement;
  createEffect(() => {
    const v = currentValue.v();
    const {
      onChange = (value?: string) => {
        divRef?.dispatchEvent(new CustomEvent('change', {
          bubbles: true,
          detail: value,
        }));
      },
    } = props2;
    onChange(v);
  });

  return (
    <div ref={el => divRef = el} class={['relative', props.class].join(' ')}>
      <Label name={props.name}>{props.title}</Label>
      <input
        {...props}
        onInput={e => currentValue.s(e.target.value)}
        value={currentValue.v()}
        class={cx(
          'inline-block box-border px-12px py-5px rounded-1 text-sm border-0 outline-1 outline-gray outline focus:outline-#006ad6 focus:outline-2',
        )}
        style={{
          width: props.width ? `${props.width}px` : '100%',
        }}
      />
    </div>
  );
};