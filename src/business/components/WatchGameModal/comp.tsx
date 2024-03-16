import { buildGame } from '@soku-games/core';
import { IconButton, Modal, ModalProps } from '@/components';
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
      height={500}
    >
      <div ref={el => divRef = el} class={'w-full h-85% aspect-ratio-video center'} />
      <div class={'flex justify-center gap-4 mt4'}>
        <IconButton icon={<div class="i-mdi:step-backward w-2em h-2em" />} onClick={() => controller()?.back?.()} />
        <IconButton icon={<div class="i-mdi:movie-open-play w-2em h-2em" />} onClick={handleStart} />
        <IconButton icon={<div class="i-mdi:step-forward w-2em h-2em" />} onClick={() => controller()?.next?.()} />
      </div>
    </Modal>
  );
};