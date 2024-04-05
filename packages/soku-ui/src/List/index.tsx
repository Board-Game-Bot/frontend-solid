import { cx } from 'soku-utils';
import { Index, JSX } from 'solid-js';

interface Props<T> {
    class?: string;
    items: T[];
    renderer: (item: T, index: number) => JSX.Element;
    height?: string;
}

export function List<T>(props: Props<T>) {
  return (
    <div
      class={cx('overflow-auto', props.class)}
      style={{
        height: props.height,
      }}
    >
      <Index each={props.items}>
        {(item, index) => props.renderer(item(), index)}
      </Index>
    </div>
  );
}
