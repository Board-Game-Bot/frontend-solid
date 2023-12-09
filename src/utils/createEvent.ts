import { Socket } from 'socket.io-client';
import { Accessor, createEffect } from 'solid-js';
import { isString } from 'lodash-es';

export const createEvent = (socket: Accessor<Socket | undefined>, event: string | Accessor<string>, callback: (...args: any[]) => void) => {
  createEffect(() => {
    socket()?.on(isString(event) ? event : event(), callback);
  });
};