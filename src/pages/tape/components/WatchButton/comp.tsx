import { WatchGameModal } from '@business';
import { JsonTapeReq } from './requests';
import { Button, ButtonProps } from '@/components';
import { useRequest, signal } from '@/utils';
import { Tape } from '@/types';

interface Props extends ButtonProps {
  tape: Tape;
}

export const WatchButton = (props: Props) => {
  const watchVisible = signal(false);
  const tape = signal<Tape>();
  const jsonTapeReq = useRequest(
    JsonTapeReq,
    {
      onSuccess: (data) => {
        watchVisible(true);
        tape({
          ...props.tape,
          ...data,
        });
      },
    });
  const handleClick = () => {
    jsonTapeReq.run({
      tapeId: props.tape.id,
    });
  };

  return (
    <>
      <Button
        onClick={handleClick}
        loading={jsonTapeReq.loading()}
      >
        观看
      </Button>
      <WatchGameModal
        tape={tape()}
        visible={watchVisible()}
        onOk={() => watchVisible(false)}
        onCancel={() => watchVisible(false)}
      />
    </>
  );
};
