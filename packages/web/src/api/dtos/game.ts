import { CommonListRequest, CommonListResponse, OnlyIdRequest, RequestFn } from '@/api';
import { Game } from '@/api/entity';

export interface GameClient {
  GetGame: RequestFn<OnlyIdRequest, Game>;
  ListGames: RequestFn<CommonListRequest, CommonListResponse<Game>>;
}
