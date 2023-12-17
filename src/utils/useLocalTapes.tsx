import { Accessor, Setter } from 'solid-js';
import { createLocalStorageSignal } from './createLocalStorageSignal';
import { Tape } from '@/types';

const [tapes, setTapes] = createLocalStorageSignal<Tape[]>('records', []);

export const useLocalTapes = (): [Accessor<Tape[]>, Setter<any>] => {
  return [tapes, setTapes];
};