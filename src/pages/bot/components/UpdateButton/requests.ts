import { sleep } from '@/utils';
import { Bot } from '@/types';

interface UpdateBotDto extends Bot {}

export const UpdateBotReq = async (dto: UpdateBotDto) => {
  await sleep(1000);
};