import { createEffect, createSignal, For } from 'solid-js';
import { Socket } from 'socket.io-client';
import { useParams } from '@solidjs/router';
import { Room } from './types';
import { cx } from '@/utils';
import { getGame, user } from '@/store';
import { PrepareRes } from '@/pages/game/[id]/components/MultiMode/components/MatchMode/types';

interface Props {
  room?: Room;
  socket?: Socket;
}

export const RoomComp = (props: Props) => {
  const [isPrepare, setPrepare] = createSignal<boolean[]>([]);
  const gameId = useParams().id;
  const handlePrepare = (index: number) => {
    props.socket?.emit('prepare', {
      isPrepare: !isPrepare()[index],
    });
  };
  const isMe = (id: string) => {
    return user()?.id === id;
  };

  createEffect(() => {
    if (!props.socket)
      return;
    const s = props.socket;

    s.on('make-room', () => {
      setPrepare(Array.from({ length: getGame(gameId)?.playerCount ?? 0 }, () => false));
    });
    s.on('prepare', (data: PrepareRes) => {
      setPrepare(data.prepareStatus);
    });
  });

  return (
    <div class={'ma w-fit'}>
      <h1 class={'text-xl ma w-fit'}>{props.room?.roomId}</h1>
      <div>
        <For each={props.room?.players}>
          {(player, index) =>
            <div
              class={cx(
                'w-full flex justify-between items-center rounded-2 px3 py2 shadow-md duration-100',
                'mt-4',
                isPrepare()[index()] && 'bg-green/70 text-white',
                isMe(player.id) && 'cursor-pointer hover:bg-blue hover:text-white',
              )}
              onClick={isMe(player.id) ? () => handlePrepare(index()) : undefined}
            >
              <div>{isMe(player.id) ? '->' : ''} ID：{player.id}</div>
              <div>分数：{player.score}</div>
            </div>
          }
        </For>
        <h2 class={'text-gray'}>{'请点击\'->\'对应的卡片准备/取消准备'}</h2>
      </div>
    </div>
  );
};