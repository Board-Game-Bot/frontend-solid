import { createEffect, createSignal, onMount } from 'solid-js';
import { userProfileApi } from '@/api/user';
import { ResponseError } from '@/api';
import { handleResponseError } from '@/utils/util';

export interface User {
  loginStatus: 'no' | 'pending' | 'login';
  id: string;
  name: string;
  avatar: string;
}

const [user, setUser] = createSignal<User>({
  loginStatus: 'no',
  id: '',
  name: '',
  avatar: '',
});

const [jwt, setJwt] = createSignal('');

onMount(() => {
  const _jwt = localStorage.getItem('jwt');
  if (_jwt) {
    setJwt(_jwt);
  }
});

createEffect(() => {
  if (jwt()) {
    // 这里使用 setTimeout 是为了使用宏任务，延迟执行，因为 api 还没初始化完成
    setTimeout(async () => {
      try {
        const resp = await userProfileApi();
        const { user } = resp.data;
        setUser({
          ...user,
          loginStatus: 'login',
        });
      } catch (e) {
        const err = e as ResponseError;
        handleResponseError(err);
      }
    });
  }
});

createEffect(() => {
  if (jwt()) {
    localStorage.setItem('jwt', jwt());
  }
});

export { user, setUser, jwt, setJwt };
