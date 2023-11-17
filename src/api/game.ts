import api, { Response } from '@/api/index';

export interface Game {
  id: string;
  name: string;
  title: string;
  description: string;
  icon: string;
  playerCount: number;
}

export async function gameGetAllApi(): Response<{
  games: Game[];
}> {
  return await api.get('/game/all');
}

export async function gameGetOneApi(id: string): Response<{
  game: Game;
}> {
  return await api.get(`/game/${id}`);
}
