import { mock, Random } from 'mockjs';
import { sleep } from '@/utils';
import { Bot } from '@/types';

interface CreateBotDto extends Omit<Bot, 'id' | 'createTime'> {
  id?: string;
}

interface CreateBotVo extends Bot {}

export const CreateBotReq = async (dto: CreateBotDto): Promise<CreateBotVo> => {
  await sleep(1000);
  return mock({
    id: '@guid',
    ...dto,
    createTime: () => Random.datetime(),
  });
};