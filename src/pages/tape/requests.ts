import { mock, Random } from 'mockjs';
import { Tape } from '@/types';

interface GetTapesVo {
  tapes: Exclude<Tape, 'userId' | 'participants' | 'json'>[];
}

export const GetTapesReq = async (pageIndex: number, pageSize: number = 10, gameId?: string): Promise<GetTapesVo> => {
  return await mock({
    [`tapes|${pageSize}`]: [{
      id: () => Random.guid(),
      gameId: () => Random.pick(['snake', 'reversi', 'backgammon']),
      uploadTime: () => Random.datetime('yyyy-MM-dd HH:mm'),
    }],
  });
};