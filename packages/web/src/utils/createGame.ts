import { Accessor, createEffect, createMemo, createSignal, on } from 'solid-js';
import { Socket } from 'socket.io-client';
import { buildGame, Game } from '@soku-games/core';
import { signal } from './signal';
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

  const roomId = createMemo(() => room()?.roomId);

  createEffect(on(roomId, () => {
    const _socket = socket(), roomId = room()?.roomId;
    if (!_socket || !roomId) return ;

    _socket.on('start-game', function listener() {
      const game = buildGame({
        name: gameId,
        plugins: [{
          name: `${gameId}-screen`,
          extra: {
            el: ref.v,
            couldControl: room()?.players.map(p => p.playerId === user.v()?.id && !p.botId),
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
            tapeResolved: (_tape: Tape) => tape(_tape),
          },
        }],
      });
      setGame(game);
      _socket.removeListener('start-game', listener);
    });
  }));

  return [game, tape];
};