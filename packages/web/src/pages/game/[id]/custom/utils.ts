import { PreRoomEvent } from '@/pages/game/[id]/custom/types';

export const makeRoomWrapper = (roomId: string) => {
  return (event: PreRoomEvent) => {
    return `PreRoom<${roomId}>(${event})`;
  };
};