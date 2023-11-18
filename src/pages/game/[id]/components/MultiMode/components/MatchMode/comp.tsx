import { createEffect, createSignal, onCleanup, Show } from 'solid-js';
import { io, Socket } from 'socket.io-client';
import { useParams } from '@solidjs/router';
import { Room } from './types';
import { RoomComp } from './components';
import { jwt } from '@/store';
import { Button } from '@/components';

export const MatchMode = () => {
  const [socket, setSocket] = createSignal<Socket>();
  const [isConnect, setConnect] = createSignal(false);

  const handleConnect = () => {
    setSocket(io('ws://localhost:3000/ws', {
      extraHeaders: {
        'x-jwt': jwt(),
      },
    }));
  };

  createEffect(() => {
    const s = socket();
    s?.on('connect', () => {
      setConnect(true);
    });
    s?.on('disconnect', () => {
      setConnect(false);
    });
  });

  onCleanup(() => socket()?.disconnect());

  const [isMatching, setMatching] = createSignal(false);

  createEffect(() => {
    const s = socket();
    s?.on('join-match', () => {
      setMatching(true);
    });
    s?.on('leave-match', () => {
      setMatching(false);
    });
    s?.on('make-room', (data: Room) => {
      setRoom(data);
      setMatching(false);
    });
  });

  const gameId = useParams().id;
  const handleClickMatch = () => {
    if (isMatching())
      socket()?.emit('leave-match');
    else
      socket()?.emit('join-match', { gameId });
  };

  const [room, setRoom] = createSignal<Room>();

  const handleLeaveRoom = () => {
    if (!socket()) return ;

    const s = socket()!;
    s.emit('leave-room');
  };
  createEffect(() => {
    const s = socket();
    s?.on('leave-room', () => {
      setRoom(undefined);
    });
  });

  return (
    <Show
      when={jwt()}
      fallback={
        <h1>你还未登陆，请先登陆！</h1>
      }
    >
      <Show when={!isConnect()}>
        <Button class={'text-xl px-4 py-1 m-a'} variant={'primary'} onClick={handleConnect}>接入网络</Button>
      </Show>
      <Show when={isConnect() && !room()} >
        <Button
          class={'text-xl px-4 py-1 m-a'}
          variant={'primary'}
          onClick={handleClickMatch}
          loading={isMatching()}
        >
          开始匹配
        </Button>
      </Show>
      <Show when={isConnect() && room()}>
        <Button
          class={'text-xl px-4 py-1 m-a'}
          variant={'danger'}
          onClick={handleLeaveRoom}
          loading={isMatching()}
        >
          退出房间
        </Button>
      </Show>
      <Show when={room()}>
        <RoomComp socket={socket()} room={room()} />
      </Show>
    </Show>
  );
};