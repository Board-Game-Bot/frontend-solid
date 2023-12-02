import { Show } from 'solid-js';
import { useParams } from '@solidjs/router';
import { RoomComp } from './components';
import { createGame, createMatch, createRoom, createSocket } from './utils';
import { jwt } from '@/store';
import { Button } from '@/components';
import { useSaveTape } from '@/utils';

export const MatchMode = () => {
  // CONNECT
  const [socket, connect, isConnect] = createSocket(import.meta.env.VITE_WS_URL, jwt());

  // MATCH
  const gameId = useParams().id;
  const [match, isMatching] = createMatch(socket, gameId);

  // ROOM
  const [room, leave] = createRoom(socket);

  // GAME
  const gameRef: {v?: HTMLElement} = {};
  const [game, tape] = createGame(socket, room, gameRef, gameId);
  const handleSave = useSaveTape(tape, gameId);

  return (
    <Show
      when={jwt()}
      fallback={<h1>你还未登陆，请先登陆</h1> }
    >
      <Show
        when={isConnect()}
        fallback={<Button class={'m-a'} variant={'primary'} onClick={connect}>接入网络</Button>}
      >
        <Show
          when={room()}
          fallback={
            <Button
              class={'m-a'}
              variant={'primary'}
              onClick={match}
              loading={isMatching()}
            >
              开始匹配
            </Button>
          }
        >
          <Show when={!game()}>
            <Button
              class={'m-a'}
              variant={'danger'}
              onClick={leave}
              loading={isMatching()}
            >
              退出房间
            </Button>
            <RoomComp socket={socket()} room={room()} />
          </Show>
          <div class={'w-1200px aspect-ratio-video flex justify-center items-center'} ref={el => gameRef.v = el} />
        </Show>
      </Show>
      <Show when={tape()}>
        <h3>对局记录已生成，是否保存？</h3>
        <Button onClick={handleSave} variant={'success'}>保存</Button>
      </Show>
    </Show>
  );
};