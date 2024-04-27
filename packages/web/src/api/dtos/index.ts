import { AuthClient } from '@/api/dtos/auth';
import { UserClient } from '@/api/dtos/user';
import { GameClient } from '@/api/dtos/game';
import { RateClient } from '@/api/dtos/rate';
import { TapeClient } from '@/api/dtos/tape';
import { BotClient } from '@/api/dtos/bot';

export * from './auth';
export * from './user';
export * from './game';
export * from './bot';
export * from './rate';
export * from './tape';

export type Client = AuthClient & UserClient & GameClient & RateClient & TapeClient & BotClient;