import { ComponentProps, createEffect, createSignal, untrack } from 'solid-js';
import { cx } from '@soku-solid/utils';
import { ChangeValue } from '../common.types';

interface Props extends Omit<ComponentProps<'input'>, 'onChange' | 'value' | 'width'>, ChangeValue<string> {
  default?: string;
  width: string;
}

export const Input = (props: Props) => {
  const defaultCurrentValue = untrack(() => props.default);
  const currentValue = createSignal(defaultCurrentValue);

  const handleChange = (value?: string) => {
    props.onChange?.(value ?? '');
  };

  createEffect(() => {
    handleChange(currentValue[0]());
  });

  return (
    <div class={['relative', props.class].join(' ')}>
      <input
        onInput={e => currentValue[1](e.target.value)}
        value={currentValue[0]()}
        class={cx(
          'inline-block box-border px-12px py-5px rounded-1 text-sm border-0 outline-1 outline-gray outline focus:outline-#006ad6 focus:outline-2',
        )}
        style={{ width: props.width }}
        {...props}
        onChange={() => handleChange(currentValue[0]())}
      />
    </div>
  );
};