import { WatchGameModal } from '@business';
import { ButtonProps, IconButton } from '@soku-solid/ui';
import { createSignal } from 'solid-js';
import { Tape } from '@/types';

interface Props extends ButtonProps {
  tape: Tape;
}

export const LocalWatchButton = (props: Props) => {
  const watchVisible = createSignal(false);

  return (
    <>
      <IconButton
        icon={
          <div class="i-mdi:movie-open-play w1em h1em" />
        }
        onClick={() => watchVisible[1](true)}
      />
      <WatchGameModal
        title={'观看录像带'}
        width={'500px'}
        height={'500px'}
        tape={props.tape}
        visible={watchVisible[0]()}
        onOk={() => watchVisible[1](false)}
        onCancel={() => watchVisible[1](false)}
      />
    </>
  );
};
