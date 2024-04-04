export interface PreRoom {
  roomId: string;
  clients: string[];
  gameId: string;
  players: {
    playerId: string;
    botId: string;
  }[];
  ownerId: string;
}

export enum PreRoomEvent {
  CreatePreRoom = 'CreatePreRoom',
  JoinPreRoom = 'JoinPreRoom',
  LeavePreRoom = 'LeavePreRoom',
  DisbandPreRoom = 'DisbandPreRoom',
  SyncPreRoom = 'SyncPreRoom',
  SeatPreRoom = 'SeatPreRoom',
  UnseatPreRoom = 'UnseatPreRoom',
  StartGame = 'StartGame',
}
