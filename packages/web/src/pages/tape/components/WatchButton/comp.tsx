import { WatchGameModal } from '@business';
import { ButtonProps, IconButton } from '@soku-solid/ui';
import { useSignal } from '@soku-solid/utils';
import { JsonTapeReq } from './requests';
import { useRequest } from '@/utils';
import { Tape } from '@/types';

interface Props extends ButtonProps {
  tape: Tape;
}

export const WatchButton = (props: Props) => {
  const watchVisible = useSignal(false);
  const tape = useSignal<Tape>();
  const jsonTapeReq = useRequest(
    JsonTapeReq,
    {
      onSuccess: (data) => {
        watchVisible.s(true);
        tape.s({
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
        width={'500px'}
        height={'500px'}
        tape={tape.v()}
        visible={watchVisible.v()}
        onOk={() => watchVisible.s(false)}
        onCancel={() => watchVisible.s(false)}
      />
    </>
  );
};
