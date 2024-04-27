import { CommonListRequest, CommonListResponse, OnlyIdRequest, OnlyIdResponse, RequestFn } from '@/api';
import { Tape } from '@/api/entity';

export interface CreateTapeRequest {
  Name?: string;
  Description?: string;
  GameId: string;
  Json: string;
}

export interface ListTapesFilter {
  GameIds?: string[];
  UserIds?: string[];
}

export interface UpdateTapeRequest {
  Id: string;
  Name?: string;
  Description?: string;
}

export interface TapeClient {
  CreateTape: RequestFn<CreateTapeRequest, OnlyIdResponse>;
  GetTape: RequestFn<OnlyIdRequest, Tape>;
  ListTapes: RequestFn<CommonListRequest<ListTapesFilter>, CommonListResponse<Tape>>;
  UpdateTape: RequestFn<UpdateTapeRequest, void>;
  DeleteTape: RequestFn<OnlyIdRequest, void>;
}
