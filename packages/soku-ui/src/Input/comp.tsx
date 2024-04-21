import { ComponentProps, createSignal, untrack } from 'solid-js';
import { cx } from '@soku-solid/utils';
import { ChangeValue } from '../common.types';

interface Props extends Omit<ComponentProps<'input'>, 'onChange' | 'onInput' | 'value' | 'width'>, ChangeValue<string> {
  onInput?: (value?: string) => any;
  default?: string;
  width: string;
}

export { Props as InputProps };

export const Input = (props: Props) => {
  const currentValue = createSignal(untrack(() => props.value));

  const handleChange = (value?: string) => {
    currentValue[1](value);
    props.onChange?.(value ?? '');
  };

  const handleInput = (value?: string) => {
    currentValue[1](value);
    props.onChange?.(value ?? '');
    props.onInput?.(value);
  };

  return (
    <div class={['relative', props.class].join(' ')}>
      <input
        value={currentValue[0]()}
        {...props}
        onInput={e => handleInput(e.target.value)}
        class={cx(
          'inline-block box-border px-12px py-5px rounded-1 text-sm border-0 outline-1 outline-gray outline focus:outline-#006ad6 focus:outline-2', props.class,
        )}
        style={{ width: props.width }}
        onChange={() => handleChange(currentValue[0]())}
      />
    </div>
  );
};