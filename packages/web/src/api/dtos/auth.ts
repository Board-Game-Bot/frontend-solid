import { RequestFn } from '@/api';

export interface RegisterAccountRequest {
  Id: string;
  Password: string;
}

export interface RegisterAccountResponse {
  Jwt: string;
}

export interface LoginAccountRequest {
  Id: string;
  Password: string;
}

export interface LoginAccountResponse {
  Jwt: string;
}

export interface AuthClient {
  RegisterAccount: RequestFn<RegisterAccountRequest, RegisterAccountResponse>;
  LoginAccount: RequestFn<LoginAccountRequest, LoginAccountResponse>
}
