import { createSignal, For } from 'solid-js';
interface Props {
  field: string;
  defaultValue?: string;
  options: { label: string; value: string }[];
  class?: string;
  onChange?: (_: string) => void;
}

export default function RadioGroup(props: Props) {
  const [currentValue, setCurrentValue] = createSignal(props.defaultValue);

  const handleChange = (e: Event) => {
    const v = (e.target as HTMLInputElement)?.value;

    setCurrentValue(v);
    props.onChange && props.onChange(v);
  };

  return (
    <div class={`${props.class} box-border rounded-md bg-gray-300 p-1`}>
      <div class="w-full flex">
        <For each={props.options}>
          {({ label, value }) => (
            <>
              <label
                class={`rounded-md inline-block box-border text-center px-2 py-1 whitespace-nowrap overflow-ellipsis cursor-pointer flex-1 ${
                  currentValue() === value && 'bg-gray-200'
                }`}
                for={value}
              >
                {label}
              </label>
              <input
                id={value}
                type="radio"
                class="hidden"
                value={value}
                name={props.field}
                onChange={handleChange}
              />
            </>
          )}
        </For>
      </div>
    </div>
  );
}
