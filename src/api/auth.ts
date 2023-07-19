import api, { Response } from '@/api/index';
import { User } from '@/store/user';

export interface AuthRegisterDto {
  account: string;
  passwd: string;
}
export function authRegisterApi(data: AuthRegisterDto): Response<{
  jwt: string;
  user: User;
}> {
  return api.post('/auth/register', data);
}

export interface AuthLoginDto {
  account: string;
  passwd: string;
}

export function authLoginApi(data: AuthLoginDto): Response<{
  jwt: string;
  user: User;
}> {
  return api.post('/auth/login', data);
}
