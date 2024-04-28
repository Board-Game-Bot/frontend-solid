import { RequestFn } from '@/api';
import { User } from '@/api/entity';

export interface UpdateUserRequest {
  Name?: string;
  Avatar?: string;
}

export interface UserClient {
    GetUser: RequestFn<void, User>;
    UpdateUser: RequestFn<UpdateUserRequest, void>;
}
