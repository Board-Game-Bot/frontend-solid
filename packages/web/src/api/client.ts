import axios, { AxiosInstance } from 'axios';
import { SuccessResponse } from './types';
import { TestFooRequest } from './dto';

export class RequestClient {
  axiosInstance: AxiosInstance;
  jwt?: string;

  constructor(baseURL: string) {
    const axiosInstance = axios.create({
      baseURL,
    });

    this.axiosInstance = axiosInstance;
  }

  private req<T, R>(action: string, data: T) {
    return this.axiosInstance.post(`/${action}`, data, {
      headers: {
        Authorization: `Bearer ${this.jwt}`,
      },
    }) as SuccessResponse<R>['Data'];
  }

  setJwt(jwt: string) {
    this.jwt = jwt;
  }

  TestFoo(body: TestFooRequest): SuccessResponse<void> {
    return this.req('TestFoo', body);
  }
}

export const client = new RequestClient(import.meta.env.VITE_REQ_URL);
