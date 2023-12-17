import { buildGame } from '@soku-games/core';
import { Button, Modal, ModalProps } from '@/components';
import { Tape } from '@/types';
import { signal } from '@/utils';

interface Props extends ModalProps {
  tape?: Tape;
}

export const WatchGameModal = (props: Props) => {
  const controller = signal<any>({});
  const handleStart = () => {
    const { tape } = props;
    if (!tape) return;

    const game = buildGame({
      name: tape.gameId,
      plugins: [{
        name: `${tape.gameId}-screen`,
        extra: {
          el: divRef,
          couldControl: [false, false],
        },
      }, {
        name: 'the-replayer',
        extra: {
          tape: tape.json,
        },
      }],
    });

    controller(game?.bundler);
    controller()?.start?.();
  };

  let divRef: HTMLElement;
  return (
    <Modal
      {...props}
    >
      <div ref={el => divRef = el} class={'w-full aspect-ratio-video center'} />
      <div class={'flex justify-center gap-4'}>
        <Button onClick={handleStart}>start</Button>
        <Button onClick={() => controller()?.back?.()}>back</Button>
        <Button onClick={() => controller()?.next?.()}>next</Button>
      </div>
    </Modal>
  );
};