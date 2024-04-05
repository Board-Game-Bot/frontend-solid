import { useSignal } from '@soku-solid/utils';

interface User {
  id: string;
  name: string;
  avatar: string;
}

const user = useSignal<User>();

export {
  user,
};