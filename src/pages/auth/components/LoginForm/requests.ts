import { LoginDto, LoginVo } from './types';
import { API } from '@/api';

export const LoginReq = (dto: LoginDto): Promise<LoginVo> => {
  return API.post('/auth/login', dto);
};