import { createEffect, createSignal, onMount } from 'solid-js';
import { userProfileApi } from '@/api/user';
import { ResponseError } from '@/types';

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
        if (resp.status === 'succeed') {
          setUser({
            ...resp.data.user,
            loginStatus: 'login',
          });
        }
      } catch (e) {
        const err = e as ResponseError;
        if (err.statusCode === 401) {
          window.alert('认证信息已过期，请重新登录');
          localStorage.setItem('jwt', '');
        } else {
          window.alert(`错误：${err.message.toString()}`);
        }
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
