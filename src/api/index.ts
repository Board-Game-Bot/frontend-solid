import axios, { InternalAxiosRequestConfig } from 'axios';
import { jwt } from '@/store/user';

export type Response<T> = Promise<{
  statusCode: 200;
  data: T;
}>;

export type ResponseError =
  | {
      statusCode: 4000;
      message: string;
      extra?: Record<string, any>;
    }
  | {
      statusCode: 200;
      data: Record<string, any>;
    }
  | {
      statusCode: 400;
      message: string[];
      error: string;
    }
  | {
      statusCode: 401;
      error: string;
    };

const api = axios.create({
  baseURL: import.meta.env.VITE_REQ_URL,
});

api.interceptors.request.use((config) => {
  const { headers } = config;
  return <InternalAxiosRequestConfig>{
    ...config,
    headers: {
      ...headers,
      Authorization: jwt() ? `Bearer ${jwt()}` : '',
    },
  };
});

api.interceptors.response.use(
  (data) => {
    return data.data;
  },
  (data) => {
    throw data.response.data;
  },
);

export default api;
