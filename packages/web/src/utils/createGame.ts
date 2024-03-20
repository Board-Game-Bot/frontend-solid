import { Accessor, createSignal } from 'solid-js';
import { Socket } from 'socket.io-client';
import { buildGame, Game } from '@soku-games/core';
import { signal } from './signal';
import { createEvent } from './createEvent';
import { Room, Tape } from '@/types';
import { user } from '@/store';

export const createGame = (
  socket: Accessor<Socket | undefined>,
  room: Accessor<Room | undefined>,
  ref: { v?: HTMLElement },
  gameId: string,
) => {
  const [game, setGame] = createSignal<Game>();
  const tape = signal<any>();

  createEvent(socket, 'start-game', () => {
    const game = buildGame({
      name: gameId,
      plugins: [{
        name: `${gameId}-screen`,
        extra: {
          el: ref.v,
          couldControl: room()?.players.map(p => p.playerId === user()?.id && !p.botId),
          emit: (stepStr: string) => {
            socket()?.emit('game-step', stepStr);
          },
        },
      }, {
        name: 'network-client-controller',
        extra: { socket: socket() },
      }, {
        name: 'the-recorder',
        extra: {
          tapeResolved: (_tape: Tape) => tape(_tape),
        },
      }],
    });
    setGame(game);
  });

  return [game, tape];
};