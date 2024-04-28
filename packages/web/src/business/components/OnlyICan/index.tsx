import { ParentProps, Show } from 'solid-js';

import { user } from '@/store';

interface Props extends ParentProps {
    userId: string;
}

export const OnlyICan = (props: Props) => {
  return (
    <Show when={props.userId === user[0]()?.Id}>
      {props.children}
    </Show>
  );
};