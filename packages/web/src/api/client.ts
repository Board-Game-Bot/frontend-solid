import axios, { AxiosResponse } from 'axios';
import { keysIn } from 'lodash-es';
import { Alert } from '@soku-solid/ui';
import { Client } from '@/api/dtos';
import { jwt } from '@/store';
import { FrontEndErrorResponse, Response, ResponseResult } from '@/api/types';

export const Api = axios.create({
  baseURL: import.meta.env.VITE_REQ_URL,
});

export const client = new Proxy({}, {
  get(_: unknown, api: string) {
    return (params: any) => Api.post(`/${api}`, params, {
      headers: {
        Authorization: `Bearer ${jwt[0]()}`,
      },
    });
  },
}) as Client;

Api.interceptors.response.use((data: AxiosResponse<Response>) => {
  const response = data.data;
  switch (response.ResultType) {
  case ResponseResult.Success: return response.Data;
  case ResponseResult.AuthorizationError:
    Alert({
      children: 'Authorization failed, please re-login again.',
    });
    throw response;
  case ResponseResult.FormatError:
    Alert({
      children: `Some parameters have been validated that invalid, please check if params are valid.\n[${keysIn(response.FormatMessage).join(', ')}]`,
    });
    throw response;
  case ResponseResult.BusinessError:
    Alert({
      children: response.Message,
    });
    throw response;
  case ResponseResult.InternalError:
    Alert({
      children: `There is an internal error, please send the request id: ${response.RequestId} to administrator`,
    });
    throw response;
  default:
    throw response;
  }
}, (error?: Response) => {
  if (!error || error?.ResultType) {
    return ;
  }
  Alert({
    children: 'The network is bad, please refresh and try again after a few seconds.',
  });
  const response: FrontEndErrorResponse = {
    ResultType: ResponseResult.FrontEndError,
    Error: error,
  };
  throw response;
});
