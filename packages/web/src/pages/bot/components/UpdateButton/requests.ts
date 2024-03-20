import { Bot } from '@/types';
import { API } from '@/api';

interface UpdateBotDto extends Bot {}

export const UpdateBotReq = async (dto: UpdateBotDto) => {
  return await API.post('/bot/update', dto);
};