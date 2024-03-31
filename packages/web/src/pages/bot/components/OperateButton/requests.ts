import { API } from '@/api';

export const CompileBotReq = async (botId: string) => {
  return await API.post('/bot/compile', { id: botId });
};

export const StopBotReq = async (botId: string) => {
  return await API.post('/bot/stop', { id: botId });
};
