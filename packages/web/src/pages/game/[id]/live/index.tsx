import { capitalize } from 'lodash-es';
import { useParams } from '@solidjs/router';
import { createSignal, For, Show } from 'solid-js';
import { buildGame, Game, LifeCycle } from '@soku-games/core';
import { Button, Layout } from '@soku-solid/ui';
import { createEvent, createSocket, useSaveTape } from '@/utils';
import { jwt } from '@/store';
import { Room, Tape } from '@/types';

const LiveMode = () => {
  const gameId = useParams().id;
  const [socket, connect, isConnect] = createSocket(import.meta.env.VITE_WS_URL, jwt[0]() ?? '');
  const gameRef: { v?: HTMLElement } = {};
  const stage = createSignal(0);
  const rooms = createSignal<Room[]>([]);
  const room = createSignal<Room>();

  const handleJoin = (roomId: string) => {
    socket()?.emit('join-live', { roomId });
  };

  const tape = createSignal<Tape>();
  const game = createSignal<Game>();
  createEvent(socket, 'load-sync', (payload: {room: Room, initData: string, steps: string[]}) => {
    stage[1](1);
    const _game = buildGame({
      name: gameId,
      plugins: [{
        name: `${gameId}-screen`,
        extra: {
          el: gameRef.v,
          couldControl: room[0]()?.players.map(() => false),
          emit: (stepStr: string) => console.log(stepStr),
        },
      }, {
        name: 'network-client-controller',
        extra: {
          socket: socket(),
        },
      }, {
        name: 'the-recorder',
        extra: {
          tapeResolved: (_tape: Tape) => tape[1](_tape),
        },
      }],
    });
    _game?.subscribe(LifeCycle.AFTER_END, () => stage[1](0));
    _game?.prepare(payload.initData);
    game[1](_game);
    // FIXME
    setTimeout(() => {
      _game?.start();
      payload.steps.forEach(step => _game?.forceStep(step));
    }, 100);
  });

  createEvent(socket, 'lives', (payload: { rooms: Room[] }) => {
    rooms[1](payload.rooms);
  });

  const handleSave = useSaveTape(tape[0], gameId);

  return (
    <Layout>
      <div class={'flex gap-4 items-center'}>
        <h1>{capitalize(gameId)} 直播模式</h1>
        <Button size={'lg'} onClick={connect}>接入网络</Button>
      </div>
      <Show when={jwt[0]()} fallback={<h1>你还未登陆，请先登陆！</h1>}>
        <div class={'flex'}>
          <div class={'flex-1 bg-black w-full aspect-ratio-video center'} ref={el => gameRef.v = el}>
            <h1 class={'text-white'}>NO SIGNAL</h1>
          </div>
          <div class={'flex-0 p-5 w-300px box-border'}>
            <Show when={isConnect()}>
              <Show when={stage[0]() === 0}>
                {tape[0]() && <Button class={'w-full mt-3'} onClick={handleSave}>保存录像</Button>}
                <h2 class={'w-fit font-600 mt-3'}>进行中对局</h2>
                <For
                  each={rooms[0]()?.filter(room => room.gameId === gameId)}
                  fallback={<h3>无对局······</h3>}
                >
                  {(room) => 
                    <div
                      class={'w-full p-3 rounded-2 shadow-md cursor-pointer hover:bg-blue/4'}
                      onClick={() => handleJoin(room.roomId)}
                    >
                      {room.roomId}
                    </div>
                  }
                </For>
              </Show>
              <Show when={stage[0]() === 1}>
                GO!
              </Show>
            </Show>
          </div>
        </div>
      </Show>
    </Layout>
  );
};

export default LiveMode;