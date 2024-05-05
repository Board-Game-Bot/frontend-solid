import { Accessor, createSignal } from 'solid-js';
import { Socket } from 'socket.io-client';
import { createEvent } from '@/utils';
import { Room } from '@/types';


export const createMatch = (socket: Accessor<Socket | undefined>, gameId: string, botId: Accessor<string | undefined>): [() => void, Accessor<boolean>] => {
  const [isMatching, setMatching] = createSignal(false);
  createEvent(socket, 'join-match', () => setMatching(true));
  createEvent(socket, 'leave-match', () => setMatching(false));
  createEvent(socket, 'make-room', () => setMatching(false));

  const match = () => {
    if (isMatching())
      socket()?.emit('leave-match');
    else {
      socket()?.emit('join-match', { gameId, botId: botId() });
    }
  };

  return [match, isMatching];
};

export const createRoom = (socket: Accessor<Socket | undefined>): [Accessor<Room | undefined>, () => void] => {
  const [room, setRoom] = createSignal<Room>();
  const leave = () => {
    socket()?.emit('leave-room');
  };
  createEvent(socket, 'make-room', (data: Room) => setRoom(data));
  createEvent(socket, 'leave-room', () => setRoom(undefined));

  return [room, leave];
};
