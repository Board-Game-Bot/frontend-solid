import { createSignal } from 'solid-js';

interface User {
  id: string;
  name: string;
  avatar: string;
}

const [user, setUser] = createSignal<User>();

export {
  user,
  setUser,
};