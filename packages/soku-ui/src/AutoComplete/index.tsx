import { createEffect, createSignal, For, Show, untrack } from 'solid-js';
import { debounce, isNumber, isString } from 'lodash-es';
import { Input, InputProps } from '../Input';
import { MaybePromise } from '../common.types';
import { AutoCompleteOption } from './types';

interface Props extends InputProps {
    optionsFn?: (value: string) => MaybePromise<AutoCompleteOption[]>;
}

export { Props as AutoCompleteProps };

export const AutoComplete = (props: Props) => {
  const [isVisible, setVisible] = createSignal(false);
  const [options, setOptions] = createSignal<AutoCompleteOption[]>([]);
  const [value, setValue] = createSignal<string | undefined>(untrack(() => props.value));
  createEffect(() => {
    setValue(props.value);
  });
  createEffect(() => {
    props.onChange?.(value());
  });

  let lock: number;
  const handleFetchOptions = debounce(async (value?: string) => {
    if (props.optionsFn) {
      const currentLock = Date.now();
      lock = currentLock;
      const options = await props.optionsFn(value ?? '');
      if (lock === currentLock) {
        setOptions(options);
        setVisible(true);
      }
    }
  }, 200);

  const handleInput = (value?: string) => {
    setValue(value);
    handleFetchOptions(value);
  };

  const handleChoose = (option: any) => {
    setValue(
      isNumber(option) || isString(option) ? option : option.value,
    );
    setVisible(false);
  };

  return (
    <>
      <Input {...props} onInput={handleInput} value={value()} onBlur={() => setTimeout(() => setVisible(false), 100)} />
      <Show when={isVisible()}>
        <div style={{ width: props.width }} class={'bg-white outline-1 outline-solid outline-#ccc translate-y-1 rounded-md'}>
          <For each={options()}>
            {(option: any) =>
              <div class={'py1 px2 hover:bg-#eee font-300 rounded-sm'} onClick={() => handleChoose(option)}>
                {['number', 'string'].includes(typeof option) ? option : option.label}
              </div>
            }
          </For>
        </div>
      </Show>
    </>
  );
};