import { RegisterDto, RegisterVo } from './types';
import { API } from '@/api';

export const RegisterReq = async (dto: RegisterDto): Promise<RegisterVo> => {
  return await API.post('/auth/register', dto);
};