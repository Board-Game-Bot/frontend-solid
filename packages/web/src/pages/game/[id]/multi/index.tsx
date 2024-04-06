import { useParams } from '@solidjs/router';
import { createEffect, Show } from 'solid-js';
import { capitalize } from 'lodash-es';
import { LifeCycle } from '@soku-games/core';
import { Button, Layout } from '@soku-solid/ui';
import { useSignal } from '@soku-solid/utils';
import { RoomComp } from './components';
import { createMatch, createRoom } from './utils';
import { createEvent, createGame, createSocket, useSaveTape } from '@/utils';
import { jwt } from '@/store';
import { BotSelect } from '@/business/components';

const MultiMode = () => {
  // CONNECT
  const [socket, connect, isConnect] = createSocket(import.meta.env.VITE_WS_URL, jwt.v() ?? '');

  // STAGE
  const stage = useSignal(0);

  // MATCH
  const gameId = useParams().id;
  const botId = useSignal('');
  const [match, isMatching] = createMatch(socket, gameId, botId.v);

  // ROOM
  const [room, leave] = createRoom(socket);
  createEvent(socket, 'make-room', () => stage.s(1));
  createEvent(socket, 'start-game', () => stage.s(2));

  // GAME
  const gameRef: {v?: HTMLElement} = {};
  const [game, tape] = createGame(socket, room, gameRef, gameId);
  const handleSave = useSaveTape(tape, gameId);
  createEffect(() => {
    game()?.subscribe(LifeCycle.AFTER_START, () => stage.s(3));
    game()?.subscribe(LifeCycle.AFTER_END, () => {
      stage.s(0);
      connect();
    });
  });

  return (
    <Layout>
      <Show
        when={jwt.v()}
        fallback={<h1>你还未登陆，请先登陆</h1> }
      >
        <div class={'flex gap-4 items-center'}>
          <h1 class={'w-fit'}>{capitalize(gameId)} 多人模式</h1>
          {!isConnect() && <Button size={'lg'} variant={'primary'} onClick={connect}>接入网络</Button>}
        </div>
        <div class={'flex justify-center items-center'}>
          <div ref={el => gameRef.v = el} class={'flex justify-center items-center flex-1 aspect-ratio-video bg-black'}>
            <h1 class={'w-fit text-white'}>NO SIGNAL</h1>
          </div>
          <div class={'flex-0 w-300px p-6 box-border'}>
            <Show when={isConnect()}>
              <Show when={stage.v() === 0}>
                <div class={'flex items-center gap-3'}>
                  <div class={'flex-1'}>
                    <BotSelect width={'200px'} onChange={botId.s} gameId={gameId} />
                  </div>
                  <Button
                    class={'flex-0 h-full'}
                    variant={'primary'}
                    onClick={match}
                    loading={isMatching()}
                  >
                    GO
                  </Button>
                </div>
                {tape() &&
                  <div class={'mt-5 flex gap-4 justify-center items-center'}>
                    <Button onClick={handleSave}>保存录像</Button>
                  </div>
                }
              </Show>
              <Show when={stage.v() === 1}>
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
              <Show when={stage.v() === 2}>
                Starting Game...
              </Show>
              <Show when={stage.v() === 3}>
                GO!
              </Show>
            </Show>
          </div>
        </div>
      </Show>
    </Layout>
  );
};

export default MultiMode;