import { createEffect } from 'solid-js';
import { createLocalStorageSignal } from '@/utils';
import { user } from '@/store';
import { client } from '@/api';

const jwt = createLocalStorageSignal<string>('jwt', '');

createEffect(async () => {
  const Jwt = jwt[0]();
  if (!Jwt) {
    return ;
  }
  const data = await client.GetUser();
  user[1](data);
});

export {
  jwt,
};