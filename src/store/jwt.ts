import { createSignal } from 'solid-js';

const [jwt, setJwt] = createSignal('');

export {
  jwt,
  setJwt,
};