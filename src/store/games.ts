import { createEffect, createSignal } from 'solid-js';
import { Game } from '@/types';
import { downloadGame } from '@/utils';

const [games, setGames] = createSignal<Game[]>([]);

export {
  games,
  setGames,
};

export const getGame = (id: string) => games().find(game => game.id === id);

createEffect(() => {
  const _games = games();
  _games.forEach(game => {
    downloadGame(game.npmPackage, game.version, 'core');
    downloadGame(game.npmPackage, game.version, 'screen');
  });
});
