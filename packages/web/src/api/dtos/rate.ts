import { CommonListRequest, CommonListResponse, RequestFn } from '../types';
import { Rate } from '@/api/entity';

export interface ListRatesFilter {
  UserIds?: string[];
  GameIds?: string[];
  BotIds?: string[];
}

export interface ListRatesRequest extends CommonListRequest<ListRatesFilter> {
  WithRank?: boolean;
}

export interface OnlyRateId {
  UserId: string;
  GameId: string;
  BotId: string;
}

export interface GetRateRequest extends OnlyRateId {}

export interface RateClient {
  ListRates: RequestFn<ListRatesRequest, CommonListResponse<Rate>>;
  GetRate: RequestFn<GetRateRequest, Rate>
}