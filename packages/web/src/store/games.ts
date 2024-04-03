import { createEffect, createSignal } from 'solid-js';
import { GetGamesReq } from './api';
import { Game } from '@/types';
import { downloadGame, useRequest } from '@/utils';

const [games, setGames] = createSignal<Game[]>([]);

export {
  games,
  setGames,
};

useRequest(
  GetGamesReq,
  {
    auto: true,
    onSuccess: ({ games }) => {
      setGames(games);
    },
  },
);

export const getGame = (id: string) => games().find(game => game.id === id);

createEffect(() => {
  const _games = games();
  _games.forEach(game => {
    downloadGame(game.npmPackage, game.version, 'core');
    downloadGame(game.npmPackage, game.version, 'screen');
  });
});
