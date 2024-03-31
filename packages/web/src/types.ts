export interface Game {
  id: string;
  description: string;
  icon: string;
  playerCount: number;
  npmPackage: string;
  version: string;
  url: string;
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
  status: BotStatus;
  statusMessage?: string;
}

export enum BotStatus {
  Hibernating = 'Hibernating',
  Deploying = 'Deploying',
  Working = 'Working',
  Terminating = 'Terminating',
  Failed = 'Failed',
}

export interface Rate {
  userId: string;
  gameId: string;
  botId: string;
  score: number;
}

export interface Player {
  playerId: string;
  score?: number;
  botId: string;
}

export interface Room {
  roomId: string;
  gameId: string;
  players: Player[]
}