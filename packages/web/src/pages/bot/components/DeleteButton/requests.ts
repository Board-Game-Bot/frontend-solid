import { API } from '@/api';

export const DeleteBotReq = async (botId: string) => {
  return await API.post('/bot/delete', { botId });
};