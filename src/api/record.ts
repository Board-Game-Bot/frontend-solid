import api from '@/api/index';
import { Response } from '@/api/index';
import { User } from '@/store/user';

export async function recordGetApi(
  id: string,
  index: number,
  size: number,
): Response<{
  records: {
    id: string;
    time: string;
    result: string;
    users: User[];
  }[];
}> {
  return await api.get(
    `/record?id=${encodeURI(id)}&index=${index}&size=${size}`,
  );
}
