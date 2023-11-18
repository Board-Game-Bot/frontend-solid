import { createSignal } from 'solid-js';
import { Game } from '@/types';

const [games, setGames] = createSignal<Game[]>([]);

export {
  games,
  setGames,
};

export const getGame = (id: string) => games().find(game => game.id === id);
