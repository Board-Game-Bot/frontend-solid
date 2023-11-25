import { sleep } from '@/utils';

interface DeleteTapeDto {
  tapeId: string;
}

export const DeleteTapeReq = async (dto: DeleteTapeDto) => {
  await sleep(1000);
};
