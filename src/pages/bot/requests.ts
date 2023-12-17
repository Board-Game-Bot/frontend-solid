import { Bot } from '@/types';
import { API } from '@/api';

interface GetBotsVo {
  bots: Bot[];
}

export const GetBotsReq = async (pageIndex: number = 0, pageSize: number = 10): Promise<GetBotsVo> => {
  return await API.get('/bot/get', {
    params: {
      pageIndex,
      pageSize,
    },
  });
};