import { API } from '@/api';
import { Bot } from '@/types';

interface BotGameVo {
  bots: Bot[];
}

export const BotGameReq = async (gameId: string): Promise<BotGameVo> => {
  return await API.get('/bot/game', {
    params: {
      gameId,
    },
  });
};
