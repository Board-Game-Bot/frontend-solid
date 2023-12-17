import { WatchGameModal } from '@business';
import { Button, ButtonProps } from '@/components';
import { signal } from '@/utils';
import { Tape } from '@/types';

interface Props extends ButtonProps {
  tape: Tape;
}

export const LocalWatchButton = (props: Props) => {
  const watchVisible = signal(false);

  return (
    <>
      <Button onClick={() => watchVisible(true)}>
        观看
      </Button>
      <WatchGameModal
        tape={props.tape}
        visible={watchVisible()}
        onOk={() => watchVisible(false)}
        onCancel={() => watchVisible(false)}
      />
    </>
  );
};
