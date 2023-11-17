import api, { Response } from '@/api/index';

export async function rankGetByGameIdApi(id: string): Response<{
  ranks: {
    id: string;
    name: string;
    rank: number;
  }[];
}> {
  return await api.get(`/rank/${id}`);
}
