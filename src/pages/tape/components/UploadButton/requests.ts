import { Tape } from '@/types';
import { API } from '@/api';

interface UploadTapeDto extends Omit<Tape, 'userId' | 'id'> {}
// 204 No Content
type UploadTapeVo = void;

export const UploadTapeReq = async (dto: UploadTapeDto): Promise<UploadTapeVo> => {
  return await API.post('/tape/upload', dto);
};
