import { WatchGameModal } from '@business';
import { ButtonProps, IconButton } from '@soku-solid/ui';
import { createSignal } from 'solid-js';
import { useRequest } from '@/utils';
import { client } from '@/api';
import { Tape } from '@/api/entity';

interface Props extends ButtonProps {
  tape: Tape;
}

export const WatchButton = (props: Props) => {
  const watchVisible = createSignal(false);
  const tape = createSignal<Tape>();
  const getTapeReq = useRequest(
    client.GetTape,
    {
      onSuccess: (data) => {
        console.log(data);
        watchVisible[1](true);
        tape[1]({
          ...props.tape,
          ...data,
        });
      },
    });
  const handleClick = () => {
    getTapeReq.run({
      Id: props.tape.Id,
    });
  };

  return (
    <>
      <IconButton
        icon={<div class="i-mdi:movie-open-play w1em h1em" />}
        loading={getTapeReq.loading()}
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
