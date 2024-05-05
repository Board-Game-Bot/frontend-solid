import { GameMode, ModeType } from './types';

export const MODE: ModeType[] = [
  {
    label: 'Single Mode',
    key: GameMode.Single,
  },
  {
    label: 'Match Mode',
    key: GameMode.Match,
  },
  {
    label: 'Custom Mode',
    key: GameMode.Custom,
  },
  {
    label: 'Live Mode',
    key: GameMode.Live,
  },
];
