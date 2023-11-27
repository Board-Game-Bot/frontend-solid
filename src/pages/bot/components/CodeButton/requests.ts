import { mock, Random } from 'mockjs';
import { sleep } from '@/utils';

export const CodeBotReq = async (botId: string) => {
  await sleep(2000);

  return await mock({
    code: () => Random.cparagraph(),
  });
};