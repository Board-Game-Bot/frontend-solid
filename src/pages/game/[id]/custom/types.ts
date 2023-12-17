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