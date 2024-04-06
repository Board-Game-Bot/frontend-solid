import { createLocalStorageSignal } from './createLocalStorageSignal';
import { Tape } from '@/types';

const tapes = createLocalStorageSignal<Tape[]>('records', []);

export const useLocalTapes = () => {
  return tapes;
};