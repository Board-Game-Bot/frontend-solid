import { Socket } from 'socket.io-client';
import { Accessor, createEffect } from 'solid-js';

export const createEvent = (socket: Accessor<Socket | undefined>, event: string, callback: (...args: any[]) => void) => {
  createEffect(() => {
    socket()?.on(event, callback);
  });
};