import { Game, GamePlugin, GamePluginImpl, LifeCycle } from '@soku-games/core';
import { Socket } from 'socket.io-client';
import { NetworkRequest } from '@/pages/game/message';

interface Extra {
    Socket: Socket;
}

export { type Extra as NetworkSyncExtra };

@GamePluginImpl('NetworkSync')
export class NetworkSyncPlugin extends GamePlugin {
  bindGame(game: Game, extra: Extra): void | Record<string, any> {
    const { Socket } = extra;
    Socket.emit(NetworkRequest.ReadyRequest);

    Socket.on(LifeCycle.BEFORE_PREPARE, (initMask: string) => {
      game.prepare(initMask);
    });

    Socket.on(LifeCycle.AFTER_START, () => {
      game.start();
    });

    Socket.on(LifeCycle.BEFORE_STEP, (step: string) => {
      game.forceStep(step);
    });

    Socket.on(LifeCycle.AFTER_END, (result:string) => {
      game.end(result);
    });
  }
}