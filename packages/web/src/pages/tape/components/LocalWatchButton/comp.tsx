import { WatchGameModal } from '@business';
import { ButtonProps, IconButton } from '@soku-solid/ui';
import { useSignal } from '@soku-solid/utils';
import { Tape } from '@/types';

interface Props extends ButtonProps {
  tape: Tape;
}

export const LocalWatchButton = (props: Props) => {
  const watchVisible = useSignal(false);

  return (
    <>
      <IconButton
        icon={
          <div class="i-mdi:movie-open-play w1em h1em" />
        }
        onClick={() => watchVisible.s(true)}
      />
      <WatchGameModal
        title={'观看录像带'}
        width={'500px'}
        height={'500px'}
        tape={props.tape}
        visible={watchVisible.v()}
        onOk={() => watchVisible.s(false)}
        onCancel={() => watchVisible.s(false)}
      />
    </>
  );
};
