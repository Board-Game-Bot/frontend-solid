import axios from 'axios';
import { GetGamesVo } from '@/store/types';

export * from './types';
export * from './client';

export const API = axios.create({
  baseURL: import.meta.env.VITE_REQ_URL,
});

export const GetGamesReq = async (): Promise<GetGamesVo> => {
  return await API.get('/game/all');
};