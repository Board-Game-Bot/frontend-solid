import { API } from '@/api';

interface JsonTapeDto {
  tapeId: string;
}
// 204 No Content
interface JsonTapeVo {
  json: Record<string, any>;
  participants: any[];
}

export const JsonTapeReq = async (dto: JsonTapeDto): Promise<JsonTapeVo> => {
  return API.get('/tape/json', {
    params: dto,
  });
};
