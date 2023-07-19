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
    <div class={`${props.class} box-border bg-gray-300 p-1 w-fit`}>
      <For each={props.options}>
        {({ label, value }) => (
          <>
            <label
              class={`inline-block box-border px-2 py-1 cursor-pointer ${
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
  );
}
