import dayjs from 'dayjs';

export * from './useRequest';
export * from './useSaveTape';
export * from './useLocalTapes';
export * from './useToggle';
export * from './cx';
export * from './createLocalStorageSignal';
export * from './createEvent';
export * from './createGame';
export * from './createSocket';
export * from './sleep';
export * from './downloadGame';
export * from './csl';

export const formatTime = (time: any) => {
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss');
};