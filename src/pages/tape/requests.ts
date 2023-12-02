import { Tape } from '@/types';
import { API } from '@/api';

interface GetTapesVo {
  tapes: Exclude<Tape, 'userId' | 'participants' | 'json'>[];
}

export const GetTapesReq = async (pageIndex: number = 0, pageSize: number = 10, gameId?: string): Promise<GetTapesVo> => {
  return await API.get('/tape/get', {
    params: {
      pageIndex,
      pageSize,
      gameId,
    },
  });
};