import { JSX, Show } from 'solid-js';
import { cx } from 'soku-utils';

interface Props {
  name?: string;
  children?: JSX.Element;
}

export const Label = (props: Props) => {
  return (
    <Show when={props.children}>
      <label
        class={cx('block font-600 text-14px pb-6px')}
        for={props.name}
      >
        {props.children}
      </label>
    </Show>
  );
};