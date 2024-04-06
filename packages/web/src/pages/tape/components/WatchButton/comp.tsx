import { WatchGameModal } from '@business';
import { ButtonProps, IconButton } from '@soku-solid/ui';
import { createSignal } from 'solid-js';
import { JsonTapeReq } from './requests';
import { useRequest } from '@/utils';
import { Tape } from '@/types';

interface Props extends ButtonProps {
  tape: Tape;
}

export const WatchButton = (props: Props) => {
  const watchVisible = createSignal(false);
  const tape = createSignal<Tape>();
  const jsonTapeReq = useRequest(
    JsonTapeReq,
    {
      onSuccess: (data) => {
        watchVisible[1](true);
        tape[1]({
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
        tape={tape[0]()}
        visible={watchVisible[0]()}
        onOk={() => watchVisible[1](false)}
        onCancel={() => watchVisible[1](false)}
      />
    </>
  );
};
