import { CommonListRequest, CommonListResponse, RequestFn } from '../types';
import { Rate } from '@/types';

export interface ListRatesFilter {
  UserIds?: string[];
  GameIds?: string[];
  BotIds?: string[];
}

export interface ListRatesRequest extends CommonListRequest<ListRatesFilter> {
  WithRank?: boolean;
}

export interface RateClient {
  ListRates: RequestFn<ListRatesRequest, CommonListResponse<Rate>>
}