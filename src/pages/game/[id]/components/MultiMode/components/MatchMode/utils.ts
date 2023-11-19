import { Accessor, createSignal, onCleanup } from 'solid-js';
import { io, Socket } from 'socket.io-client';
import { buildGame, Game } from '@soku-games/core';
import { Room } from './types';
import { createEvent } from '@/utils';
import { user } from '@/store';

export const createSocket = (url: string, jwt: string): [Accessor<Socket | undefined>, () => void, Accessor<boolean>] => {
  const [socket, setSocket] = createSignal<Socket>();
  const [isConnect, setConnect] = createSignal(false);

  const connect = () => {
    setSocket(io(url, {
      extraHeaders: {
        'x-jwt': jwt,
      },
    }));
  };
  createEvent(socket, 'connect', () => setConnect(true));
  createEvent(socket, 'disconnect', () => setConnect(false));
  onCleanup(() => socket()?.disconnect());

  return [socket, connect, isConnect];
};

export const createMatch = (socket: Accessor<Socket | undefined>, gameId: string): [() => void, Accessor<boolean>] => {
  const [isMatching, setMatching] = createSignal(false);
  createEvent(socket, 'join-match', () => setMatching(true));
  createEvent(socket, 'leave-match', () => setMatching(false));
  createEvent(socket, 'make-room', () => setMatching(false));

  const match = () => {
    if (isMatching())
      socket()?.emit('leave-match');
    else {
      socket()?.emit('join-match', { gameId });
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

export const createGame = (
  socket: Accessor<Socket | undefined>,
  room: Accessor<Room | undefined>,
  ref: { v?: HTMLElement },
  gameId: string,
): [Accessor<Game | undefined>] => {
  const [game, setGame] = createSignal<Game>();
  createEvent(socket, 'start-game', () => {
    const game = buildGame({
      name: gameId,
      plugins: [{
        name: `${gameId}-screen`,
        extra: {
          el: ref.v,
          couldControl: room()?.players.map(p => p.id === user()?.id),
          emit: (stepStr: string) => {
            socket()?.emit('game-step', stepStr);
          },
        },
      }, {
        name: 'network-client-controller',
        extra: { socket: socket() },
      }],
    });
    setGame(game);
  });
  
  return [game];
};