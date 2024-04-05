import { createSignal } from 'solid-js';
import { useSignal } from '@soku-solid/utils/src';

interface User {
  id: string;
  name: string;
  avatar: string;
}

const user = useSignal<User>();

export {
  user,
};