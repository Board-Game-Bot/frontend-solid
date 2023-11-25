import { mock } from 'mockjs';
import { sleep } from '@/utils';

interface JsonTapeDto {
  tapeId: string;
}
// 204 No Content
interface JsonTapeVo {
  json: Record<string, any>;
  participants: any[];
}

export const JsonTapeReq = async (dto: JsonTapeDto): Promise<JsonTapeVo> => {
  await sleep(2000);
  // TODO
  return await mock({
    json: {

    },
    participants: {

    },
  });
};
