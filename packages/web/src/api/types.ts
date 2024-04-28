export enum ResponseResult {
    Success = 'Success',
    FormatError = 'FormatError',
    AuthorizationError = 'AuthorizationError',
    BusinessError = 'BusinessError',
    InternalError = 'InternalError',
    FrontEndError = 'FrontEndError',
}

interface WithRequestId {
    RequestId: string;
}

export interface SuccessResponse<T = any> extends WithRequestId {
    ResultType: ResponseResult.Success;
    Data: T;
}

export interface FormatErrorResponse extends WithRequestId {
    ResultType: ResponseResult.FormatError;
    FormatMessage: Record<string, string>;
}

export interface AuthorizationErrorResponse extends WithRequestId {
    ResultType: ResponseResult.AuthorizationError;
}

export interface BusinessErrorResponse extends WithRequestId {
    ResultType: ResponseResult.BusinessError;
    Message: string;
}

export interface InternalErrorResponse extends WithRequestId {
    ResultType: ResponseResult.InternalError;
    // 不暴露给前端
    ErrorMessage?: string;
}

export interface FrontEndErrorResponse {
    ResultType: ResponseResult.FrontEndError;
    Error: any;
}

export type ErrorResponse =
    | FormatErrorResponse
    | AuthorizationErrorResponse
    | BusinessErrorResponse
    | InternalErrorResponse
    | FrontEndErrorResponse;

export type Response =
    | SuccessResponse
    | ErrorResponse;

export interface CommonListRequest<F = Record<string, never>> {
  PageSize?: number;
  PageOffset?: number;
  Filter?: F;
}

export interface CommonListResponse<B> {
    TotalCount: number;
    Items: B[];
}

export interface OnlyIdRequest {
    Id: string;
}

export interface OnlyIdResponse {
    Id: string;
}

export type RequestFn<Req, Res> = (params: Req) => Promise<Res>;
