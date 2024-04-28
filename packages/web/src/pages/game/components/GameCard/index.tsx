import { capitalize } from 'lodash-es';
import { ComponentProps } from 'solid-js';
import { Game } from '@/api/entity';

interface Props extends ComponentProps<'div'> {
  game: Game;
  selected: boolean;
}

export const GameCard = (props: Props) => {
  return (
    <div
      class={'cursor-pointer flex justify-between items-center px5 py2 gap4 hover:bg-#d0d0d0 rounded-2'}
      classList={{
        ['bg-#ddd']: !props.selected,
        ['bg-#d0d0d0']: props.selected,
      }}
      {...props}>
      <div class={'flex items-center gap-4'}>
        <div class={'text-10 w-fit h-fit'}>
          {props.game.Icon}
        </div>
        <div>
          <div class={'text-2xl'}>
            {capitalize(props.game.Id)}
          </div>
          <div class={'text-16px text-#999'}>
            {props.game.NpmPackage}@{props.game.Version}
          </div>
        </div>
      </div>
    </div>
  );
};