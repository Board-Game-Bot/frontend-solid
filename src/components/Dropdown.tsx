import { children, createSignal, For, JSX } from 'solid-js';
import { debounce, isNumber, isString, isUndefined } from 'lodash';

export interface DropdownOption {
  key: string | number;
  label: JSX.Element | string | number;
}

interface Props {
  children: any;
  class: string;
  options?: DropdownOption[];
  onOptionClick?: (_: string | number) => void;
}

export default function Dropdown(props: Props) {
  const [visible, setVisible] = createSignal(false);

  const handleClick = () => {
    toggleVisible(true);
  };

  const toggleVisible = debounce((_visible?: boolean) => {
    if (isUndefined(_visible)) {
      setVisible(!visible());
    } else {
      setVisible(_visible);
    }
  }, 100);

  const handleMouseEnter = () => {
    toggleVisible(true);
  };

  const handleMouseLeave = () => {
    toggleVisible(false);
  };

  const c = children(() => props.children);

  const handleOptionClick = (key: string | number) => {
    props.onOptionClick && props.onOptionClick(key);
  };

  return (
    <div
      class={`${props.class} cursor-pointer`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {c()}
      {visible() && (
        <div class="cursor-default absolute right-0 top-[110%] bg-slate-100 rounded-lg px-2 py-2">
          <For each={props.options}>
            {({ key, label }) => (
              <>
                {(isNumber(label) || isString(label)) && (
                  <div
                    class={
                      'cursor-pointer m-0 py-2 px-2 rounded-md' +
                      ((isNumber(label) || isString(label)) &&
                        ' hover:bg-slate-200 text-black')
                    }
                    onClick={() => handleOptionClick(key)}
                  >
                    {label}
                  </div>
                )}
                {!isNumber(label) && !isString(label) && (
                  <div
                    class="cursor-pointer"
                    onClick={() => handleOptionClick(key)}
                  >
                    {label}
                  </div>
                )}
              </>
            )}
          </For>
        </div>
      )}
    </div>
  );
}
