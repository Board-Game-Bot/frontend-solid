import { Game, GamePlugin, GamePluginImpl, LifeCycle } from '@soku-games/core';
import { Socket } from 'socket.io-client';

@GamePluginImpl('network-client-controller')
export class NetworkClientController extends GamePlugin {
  bindGame(game: Game, extra?: { socket: Socket }): void | Record<string, any> {
    const s = extra?.socket;

    const handleGamePrepare = (initDataMask: string) => {
      game.prepare(initDataMask);
      s?.emit('game-start');
    };
    s?.on('game-prepare', handleGamePrepare);

    const handleGameStart = () => {
      setTimeout(() => {
        game.start();
      });
    };
    s?.on('game-start', handleGameStart);

    const handleGameStep = (stepStr: string) => {
      game.forceStep(stepStr);
    };
    s?.on('game-step', handleGameStep);

    const handleGameOver = (result: string) => {
      game.end(result);
    };
    s?.on('game-over', handleGameOver);

    game.subscribe(LifeCycle.AFTER_END, () => {
      s?.removeAllListeners('game-prepare');
      s?.removeAllListeners('game-start');
      s?.removeAllListeners('game-step');
      s?.removeAllListeners('game-over');
    });
  }
}