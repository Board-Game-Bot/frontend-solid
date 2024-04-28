import { createLocalStorageSignal } from './createLocalStorageSignal';
import { Tape } from '@/api/entity';

const tapes = createLocalStorageSignal<Tape[]>('records', []);

export const useLocalTapes = () => {
  return tapes;
};