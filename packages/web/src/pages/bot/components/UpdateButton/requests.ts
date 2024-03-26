import { Bot } from '@/types';
import { API } from '@/api';

export interface UpdateBotDto extends Bot {}

export const UpdateBotReq = async (dto: UpdateBotDto) => {
  return await API.post('/bot/update', dto);
};