import { mock, Random } from 'mockjs';

export function generate() {
  return mock({
    id: () => Random.guid(),
    uploadTime: () => Random.datetime('yyyy-MM-dd HH:mm'),
    gameId: () => Random.pick(['snake', 'reversi', 'backgammon']),
  });
}