export interface Room {
  roomId: string;
  players: Player[]
}

export interface Player {
  id: string;
  score: number;
}

