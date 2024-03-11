import { API } from '@/api';

interface CodeVo {
  code: string;
}

export const CodeBotReq = async (botId: string): Promise<CodeVo> => {
  return await API.get('/bot/code', {
    params: {
      botId,
    },
  });
};