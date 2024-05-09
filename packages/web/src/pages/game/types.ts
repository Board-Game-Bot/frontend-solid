import { Game as SokuGame } from '@soku-games/core';
import { Bot, Game, User } from '@/api/entity';

export enum GameMode {
    Single = 'single',
    Match = 'match',
    Custom = 'custom',
    Live = 'live',
}

export interface ModeType {
    key: GameMode;
    label: string;
}

export interface Participant {
    User: User;
    Bot?: Bot;
    IsReady?: boolean;
}

export interface Room {
    Id: string;
    Game: Game;
    Mode: GameMode;
    Players: Participant[];
    Audience: Participant[];
    SokuGame?: SokuGame;
}