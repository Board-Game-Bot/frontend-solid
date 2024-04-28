import { Accessor, createEffect, createMemo, createSignal, on } from 'solid-js';
import { Socket } from 'socket.io-client';
import { buildGame, Game } from '@soku-games/core';
import { Room, Tape } from '@/types';
import { user } from '@/store';

export const createGame = (
  socket: Accessor<Socket | undefined>,
  room: Accessor<Room | undefined>,
  ref: { v?: HTMLElement },
  gameId: string,
) => {
  const game = createSignal<Game>();
  const tape = createSignal<any>();

  const roomId = createMemo(() => room()?.roomId);

  createEffect(on(roomId, () => {
    const _socket = socket(), roomId = room()?.roomId;
    if (!_socket || !roomId) return ;

    _socket.on('start-game', function listener() {
      const _game = buildGame({
        name: gameId,
        plugins: [{
          name: `${gameId}-screen`,
          extra: {
            el: ref.v,
            couldControl: room()?.players.map(p => p.playerId === user[0]()?.Id && !p.botId),
            emit: (stepStr: string) => {
              socket()?.emit('game-step', stepStr);
            },
          },
        }, {
          name: 'network-client-controller',
          extra: { socket: _socket },
        }, {
          name: 'the-recorder',
          extra: {
            tapeResolved: (_tape: Tape) => tape[1](_tape),
          },
        }],
      });
      game[1](_game);
      _socket.removeListener('start-game', listener);
    });
  }));

  return [game, tape];
};