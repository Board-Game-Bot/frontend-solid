import { Game, GamePlugin, GamePluginImpl } from '@soku-games/core';
import { Socket } from 'socket.io-client';

@GamePluginImpl('network-client-controller')
export class NetworkClientController extends GamePlugin {
  bindGame(game: Game, extra?: { socket: Socket }): void | Record<string, any> {
    const s = extra?.socket;

    s?.on('game-prepare', (initDataMask: string) => {
      game.prepare(initDataMask);
    });

    s?.on('game-start', () => {
      game.start();
    });

    s?.on('game-step', (stepStr: string) => {
      game.step(stepStr);
    });

    s?.on('game-over', (result: string) => {
      game.end(result);
    });
  }
}