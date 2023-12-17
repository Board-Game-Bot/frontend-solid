import { Bot } from '@/types';
import { API } from '@/api';

interface CreateBotDto extends Omit<Bot, 'id' | 'createTime'> {
  id?: string;
}

interface CreateBotVo extends Bot {}

export const CreateBotReq = async (dto: CreateBotDto): Promise<CreateBotVo> => {
  return await API.post('/bot/create', dto);
};