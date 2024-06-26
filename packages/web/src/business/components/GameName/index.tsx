import { createMemo } from 'solid-js';
import { capitalize } from 'lodash-es';
import { cx } from '@/utils';
import { games } from '@/store';

interface Props {
    class?: string;
    name: string
}

export const GameName = (props: Props) => {
  const icon = createMemo(() => {
    return games[0]()?.find(game => game.Id === props.name)?.Icon;
  });
  return (
    <div class={cx(props.class)}>
      {icon()} {capitalize(props.name)}
    </div>
  );
};