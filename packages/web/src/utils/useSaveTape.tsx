import { Accessor } from 'solid-js';
import dayjs from 'dayjs';
import { useLocalTapes } from '@/utils';
import { Tape } from '@/types';

export const useSaveTape = (tape: Accessor<any>, gameId: string) => {
  return () => {
    const tapes = useLocalTapes();

    if (tapes.v()?.find(item => JSON.stringify(item) === JSON.stringify(tape()))) {
      return ;
    }

    const newTapes = tapes.v()!;
    tapes.s([...newTapes, { gameId, json: tape(), uploadTime: dayjs().format('YYYY-MM-DD HH:mm') } as Tape]);
  };
};