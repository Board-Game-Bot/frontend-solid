import { WatchGameModal } from '@business';
import { ButtonProps, IconButton } from '@soku-solid/ui';
import { signal } from '@/utils';
import { Tape } from '@/types';

interface Props extends ButtonProps {
  tape: Tape;
}

export const LocalWatchButton = (props: Props) => {
  const watchVisible = signal(false);

  return (
    <>
      <IconButton
        icon={
          <div class="i-mdi:movie-open-play w1em h1em" />
        }
        onClick={() => watchVisible(true)}
      />
      <WatchGameModal
        title={'观看录像带'}
        width={500}
        height={500}
        tape={props.tape}
        visible={watchVisible()}
        onOk={() => watchVisible(false)}
        onCancel={() => watchVisible(false)}
      />
    </>
  );
};
