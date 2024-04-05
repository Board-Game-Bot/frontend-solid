import { createEffect } from 'solid-js';
import { useSignal } from '@soku-solid/utils';
import { GetGamesReq } from './api';
import { Game } from '@/types';
import { downloadGame, useRequest } from '@/utils';

const games = useSignal<Game[]>([]);

export {
  games,
};

useRequest(
  GetGamesReq,
  {
    auto: true,
    onSuccess: ({ games: g }) => {
      games.s(g);
    },
  },
);

export const getGame = (id: string) => games.v()?.find(game => game.id === id);

createEffect(() => {
  const _games = games.v()!;
  _games.forEach(game => {
    downloadGame(game.npmPackage, game.version, 'core');
    downloadGame(game.npmPackage, game.version, 'screen');
  });
});
