import { GetGamesVo } from './types';
import { API } from '@/api';

export const GetGamesReq = async (): Promise<GetGamesVo> => {
  return await API.get('/game/all');
};