import { API } from '@/api';
import { User } from '@/types';

export const LoadProfileReq = async (): Promise<User> => {
  return await API.get('/auth/load');
};