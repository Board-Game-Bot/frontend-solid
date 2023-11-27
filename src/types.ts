export interface Game {
  id: string;
  description: string;
  icon: string;
  playerCount: number;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Tape {
  id: string;
  userId: string;
  gameId: string;
  uploadTime: string;
  json: Record<string, any>;
  // TODO
  participants: any[];
}

export interface Bot {
  id: string;
  gameId: string;
  langId: string;
  userId: string;
  name: string;
  description: string;
  createTime: Date;
  isPublic: boolean;
  code?: string;
}

