import { useSignal } from '@soku-solid/utils';
import { createEffect } from 'solid-js';

interface User {
  id: string;
  name: string;
  avatar: string;
}

const user = useSignal<User>();

createEffect(() => {
  console.log(user.v());
});

export {
  user,
};