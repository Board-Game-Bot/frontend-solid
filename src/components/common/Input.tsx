import { createSignal } from 'solid-js';
import { Validator } from '@/types';
import { debounce } from 'lodash';

interface Props {
  field: string;
  type?: string;
  label?: string;
  class?: string;
  validate?: Validator[];
  defaultValue?: string;
}

export default function Input(props: Props) {
  const [error, setError] = createSignal('');
  const [value, setValue] = createSignal(props.defaultValue || '');

  function handleInput(s: string) {
    setError('');
    setValue(s);
    check(s);
  }

  const check = debounce(async (s: string) => {
    if (props.validate) {
      for (const validator of props.validate) {
        if (!validator) continue;

        const result = await validator(s);

        if (result) {
          setError(result);
          break;
        }
      }
    }
  }, 500);

  return (
    <div
      class={`border-2 ${
        error() ? 'border-[#ee1111] text-[#ee1111]' : 'border-gray-400'
      } border-solid box-border flex items-center px-2 py-1 bg-white rounded-md ${
        props.class
      }`}
    >
      <label for={props.field} class="box-border px-2 m-0">
        {props.label || props.field}
      </label>
      <div class="flex-1 relative h-fit">
        <input
          id={props.field}
          class="text-black block w-full box-border border-0 outline-0 bg-none px-2 py-2 h-[30px]"
          name={props.field}
          type={props.type || 'text'}
          value={value()}
          onInput={(e: any) => handleInput(e.target.value)}
        />
        {error() && (
          <span class="text-[#ee1111] absolute -bottom-2 left-1 text-[12px] origin-top-left scale-75">
            {error()}
          </span>
        )}
      </div>
    </div>
  );
}
