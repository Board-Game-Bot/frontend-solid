import { createEffect, createSignal } from 'solid-js';

import { downloadGame, useRequest } from '@/utils';
import { client } from '@/api';
import { Game } from '@/api/entity';

const games = createSignal<Game[]>([]);

export {
  games,
};

useRequest(
  client.ListGames,
  {
    auto: true,
    onSuccess: ({ Items }) => {
      games[1](Items);
    },
  },
);

export const getGame = (id: string) => games[0]()?.find(game => game.Id === id);

createEffect(() => {
  const _games = games[0]()!;
  _games.forEach(game => {
    downloadGame(game.NpmPackage, game.Version, 'core');
    downloadGame(game.NpmPackage, game.Version, 'screen');
  });
});
