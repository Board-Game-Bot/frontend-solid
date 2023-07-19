import axios, { InternalAxiosRequestConfig } from 'axios';
import { jwt } from '@/store/user';

export type Response<T> = Promise<
  | {
      status: 'succeed';
      data: T;
    }
  | {
      status: 'failed';
      data: {
        message: any;
      };
    }
>;

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
