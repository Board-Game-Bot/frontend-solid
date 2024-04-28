import { Accessor } from 'solid-js';
import dayjs from 'dayjs';
import { useLocalTapes } from '@/utils';
import { Tape } from '@/api/entity';

export const useSaveTape = (tape: Accessor<any>, gameId: string) => {
  return () => {
    const tapes = useLocalTapes();

    if (tapes[0]()?.find(item => JSON.stringify(item) === JSON.stringify(tape()))) {
      return ;
    }

    const newTapes = tapes[0]();
    tapes[1]([...newTapes, {
      Id: '',
      Name: '',
      Description: '',
      GameId: gameId,
      Json: tape(),
      UserId: '',
      CreateTime: dayjs().format('YYYY-MM-DD HH:mm'),
    } as Tape]);
  };
};