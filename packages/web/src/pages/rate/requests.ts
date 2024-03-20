import { API } from '@/api';
import { Rate } from '@/types';


interface GetRatesDto {
  gameId: string;
  pageIndex: number;
  pageSize: number;
}

interface GetRatesVo {
  rates: Rate[];
}

export const GetRatesReq = async (params: GetRatesDto): Promise<GetRatesVo> => {
  return await API.get('/rate/get', { params });
};