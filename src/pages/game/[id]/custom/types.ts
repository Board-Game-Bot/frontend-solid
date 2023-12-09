export interface PreRoom {
  roomId: string;
  clients: string[];
  players: {
    playerId: string;
    botId: string;
  }[];
  ownerId: string;
}