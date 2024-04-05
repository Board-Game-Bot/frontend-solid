import { ComponentProps, createEffect, untrack } from 'solid-js';
import { cx, useSignal } from '@soku-solid/utils';
import { isNumber } from 'lodash-es';
import { ChangeValue } from '../common.types';

interface Props extends Omit<ComponentProps<'input'>, 'onChange' | 'value'>, ChangeValue<string> {
  default?: string;
}

export const Input = (props: Props) => {
  const defaultCurrentValue = untrack(() => props.default);
  const currentValue = useSignal(defaultCurrentValue);

  const handleChange = (value?: string) => {
    props.onChange?.(value ?? '');
  };

  createEffect(() => {
    handleChange(currentValue.v());
  });

  return (
    <div class={['relative', props.class].join(' ')}>
      <input
        onInput={e => currentValue.s(e.target.value)}
        value={currentValue.v()}
        class={cx(
          'inline-block box-border px-12px py-5px rounded-1 text-sm border-0 outline-1 outline-gray outline focus:outline-#006ad6 focus:outline-2',
        )}
        style={{ width: isNumber(props.width) ? `${props.width}px` : props.width }}
        {...props}
        onChange={() => handleChange(currentValue.v())}
      />
    </div>
  );
};