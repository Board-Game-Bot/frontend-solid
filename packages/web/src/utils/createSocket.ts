import { Accessor, createSignal, onCleanup } from 'solid-js';
import { io, Socket } from 'socket.io-client';
import { createEvent } from './createEvent';

export const createSocket = (url: string, jwt: string): [Accessor<Socket | undefined>, () => void, Accessor<boolean>] => {
  const [socket, setSocket] = createSignal<Socket>();
  const [isConnect, setConnect] = createSignal(false);

  const connect = () => {
    setSocket(io(url, {
      extraHeaders: {
        'x-jwt': jwt,
      },
    }));
  };
  createEvent(socket, 'connect', () => setConnect(true));
  createEvent(socket, 'disconnect', () => setConnect(false));
  onCleanup(() => socket()?.disconnect());

  return [socket, connect, isConnect];
};
