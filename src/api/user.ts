import api, { Response } from '@/api/index';
import { User } from '@/store/user';

export function userProfileApi(id?: string): Response<{ user: User }> {
  return api.get(`/user/profile${id ? `/${id}` : ''}`);
}
