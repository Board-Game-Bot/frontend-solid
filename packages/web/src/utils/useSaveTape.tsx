import { Accessor } from 'solid-js';
import dayjs from 'dayjs';
import { useLocalTapes } from '@/utils/useLocalTapes';

// FIXME type
export const useSaveTape = (tape: Accessor<any>, gameId: string) => {
  return () => {
    const [tapes, setTapes] = useLocalTapes();

    if (!tapes().find(item => JSON.stringify(item) === JSON.stringify(tape()))) {
      setTapes([...tapes(), { gameId, json: tape(), uploadTime: dayjs().format('YYYY-MM-DD HH:mm') }]);
    }
  };
};