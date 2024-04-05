import { ComponentProps } from 'solid-js';
import { ModeType } from '@/pages/game/types';

interface Props extends ComponentProps<'div'> {
    mode: ModeType;
}

export const ModeCard = (props: Props) => {
  return (
    <div
      class={'cursor-pointer flex justify-between items-center px5 py2 gap4 bg-#ddd hover:bg-#d0d0d0 rounded-2'}
      {...props}
    >
      <div class={'flex items-center gap-4'}>
        <div class={'text-2xl'}>
          {props.mode.label}
        </div>
      </div>
    </div>
  );
};