import { createSignal } from 'solid-js';
import { User } from '@/api/entity';

const user = createSignal<User>();

export {
  user,
};