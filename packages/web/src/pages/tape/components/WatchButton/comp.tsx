import { WatchGameModal } from '@business';
import { ButtonProps, IconButton } from 'soku-ui';
import { JsonTapeReq } from './requests';
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
      <IconButton
        icon={<div class="i-mdi:movie-open-play w1em h1em" />}
        loading={jsonTapeReq.loading()}
        onClick={handleClick}
      />
      <WatchGameModal
        width={500}
        height={500}
        tape={tape()}
        visible={watchVisible()}
        onOk={() => watchVisible(false)}
        onCancel={() => watchVisible(false)}
      />
    </>
  );
};
