import { Tape } from '@/types';
import { sleep } from '@/utils';

interface UploadTapeDto extends Omit<Tape, 'userId' | 'id'> {}
// 204 No Content
type UploadTapeVo = void;

export const UploadTapeReq = async (dto: UploadTapeDto) => {
  await sleep(500);
  return;
};
