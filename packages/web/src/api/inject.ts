import { createEffect } from 'solid-js';
import { AxiosResponse } from 'axios';
import { Alert } from '@soku-solid/ui';
import { keysIn } from 'lodash-es';
import { client } from './client';
import { FrontEndErrorResponse, Response, ResponseResult } from './types';
import { jwt } from '@/store';

export const inject = () => {
  createEffect(() => {
    client.setJwt(jwt[0]());
  });

  client.axiosInstance.interceptors.response.use((data: AxiosResponse<Response>) => {
    console.log('data', data);
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
};
