import { mock, Random } from 'mockjs';
import { Bot } from '@/types';

interface GetBotsVo {
  bots: Bot[];
}

export const GetBotsReq = async (pageIndex: number = 0, pageSize: number = 10): Promise<GetBotsVo> => {
  return mock({
    [`bots|${pageSize}`]: [{
      id: () => Random.guid(),
      gameId: () => Random.pick(['reversi', 'snake', 'backgammon']),
      langId: () => Random.pick(['c++', 'go', 'python', 'java']),
      userId: () => Random.guid(),
      name: () => Random.name(),
      description: () => Random.cparagraph(),
      createTime: () => Random.datetime(),
      isPublic: () => Random.boolean(),
      code: () => Random.cparagraph(),
    }],
  });
};