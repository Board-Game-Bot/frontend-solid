import { API } from '@/api';

interface DeleteTapeDto {
  tapeId: string;
}

export const DeleteTapeReq = async (dto: DeleteTapeDto) => {
  return await API.post('/tape/delete', dto);
};
