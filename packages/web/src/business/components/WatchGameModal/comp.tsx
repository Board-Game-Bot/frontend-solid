import { buildGame } from '@soku-games/core';
import { IconButton, Modal, ModalProps } from '@soku-solid/ui';
import { createSignal } from 'solid-js';
import { Tape } from '@/api/entity';

interface Props extends ModalProps {
  tape?: Tape;
}

export const WatchGameModal = (props: Props) => {
  const controller = createSignal<any>({});
  const handleStart = () => {
    const { tape } = props;
    if (!tape) return;

    const game = buildGame({
      name: tape.GameId,
      plugins: [{
        name: `${tape.GameId}-screen`,
        extra: {
          el: divRef,
          couldControl: [false, false],
        },
      }, {
        name: 'the-replayer',
        extra: {
          tape: tape.Json,
        },
      }],
    });

    controller[1](game?.bundler);
    controller[0]()?.start?.();
  };

  let divRef: HTMLElement;
  return (
    <Modal
      {...props}
      height={'500px'}
    >
      <div ref={el => divRef = el} class={'w-full h-85% aspect-ratio-video center'} />
      <div class={'flex justify-center gap-4 mt4'}>
        <IconButton icon={<div class="i-mdi:step-backward w-2em h-2em" />} onClick={() => controller[0]()?.back?.()} />
        <IconButton icon={<div class="i-mdi:movie-open-play w-2em h-2em" />} onClick={handleStart} />
        <IconButton icon={<div class="i-mdi:step-forward w-2em h-2em" />} onClick={() => controller[0]()?.next?.()} />
      </div>
    </Modal>
  );
};