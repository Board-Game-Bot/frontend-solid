import { createSignal } from 'solid-js';

interface User {
  id: string;
  name: string;
  avatar: string;
}

const user = createSignal<User>();

export {
  user,
};