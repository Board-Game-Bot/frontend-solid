import { createEffect, createSignal } from 'solid-js';
import { GetGamesReq } from './api';
import { Game } from '@/types';
import { downloadGame, useRequest } from '@/utils';

const games = createSignal<Game[]>([]);

export {
  games,
};

useRequest(
  GetGamesReq,
  {
    auto: true,
    onSuccess: ({ games: g }) => {
      games[1](g);
    },
  },
);

export const getGame = (id: string) => games[0]()?.find(game => game.id === id);

createEffect(() => {
  const _games = games[0]()!;
  _games.forEach(game => {
    downloadGame(game.npmPackage, game.version, 'core');
    downloadGame(game.npmPackage, game.version, 'screen');
  });
});
