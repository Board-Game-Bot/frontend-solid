import axios from 'axios';
import { Alert } from '@/components';
import { jwt } from '@/store';

export const API = axios.create({
  baseURL: import.meta.env.VITE_REQ_URL,
});

API.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${jwt()}`;
  return config;
});

API.interceptors.response.use((data) => {
  return data.data;
}, (e) => {
  if (e.response.data.statusCode === 400)
    Alert({
      children: e.response.data.message.toString(),
    });
  throw e.response.data;
});