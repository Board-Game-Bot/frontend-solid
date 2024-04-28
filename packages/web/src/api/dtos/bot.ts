import { Bot, BotStatus } from '@/api/entity';
import { CommonListRequest, CommonListResponse, OnlyIdRequest, OnlyIdResponse, RequestFn } from '@/api';

export interface CreateBotRequest {
  Name?: string;
  Description?: string;
  GameId: string;
  Lang: string;
  Code: string;
}

export interface ListBotsFilter {
  GameIds?: string[];
  Langs?: string[];
  Statuses?: BotStatus[];
  UserIds?: string[];
}

export interface UpdateBotRequest {
  Id: string;
  Name?: string;
  Description?: string;
  Code?: string;
}

export interface BotClient {
    CreateBot: RequestFn<CreateBotRequest, OnlyIdResponse>;
    GetBot: RequestFn<OnlyIdRequest, Bot>;
    ListBots: RequestFn<CommonListRequest<ListBotsFilter>, CommonListResponse<Bot>>;
    UpdateBot: RequestFn<UpdateBotRequest, void>;
    DeleteBot: RequestFn<OnlyIdRequest, void>;
    StartBot: RequestFn<OnlyIdRequest, void>;
    StopBot: RequestFn<OnlyIdRequest, void>;
}