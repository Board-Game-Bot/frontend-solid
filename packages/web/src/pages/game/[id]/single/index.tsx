import { useParams } from '@solidjs/router';
import { capitalize } from 'lodash-es';
import { buildGame, LifeCycle, NewGenerator } from '@soku-games/core';
import { Button, Layout } from '@soku-solid/ui';
import { signal, useSaveTape } from '@/utils';
import { Tape } from '@/types';

const SingleMode = () => {
  const gameId = useParams().id;
  const isGameOver = signal(true);
  let gameRef: HTMLDivElement;
  const tape = signal<Tape>();
  const handleSave = useSaveTape(tape, gameId);

  const handleStart = () => {
    const game = buildGame({
      name: gameId,
      plugins: [`${gameId}-validator`, {
        name: `${gameId}-screen`,
        extra: {
          el: gameRef,
          couldControl: [true, true],
          emit: (stepStr: string) => {
            game?.step(stepStr);
          },
        },
      }, {
        name: 'the-recorder',
        extra: {
          tapeResolved: (theTape: any) => tape(theTape),
        },
      }],
    })!;
    const data = NewGenerator(gameId).generate();
    game.prepare(data);

    game.subscribe(LifeCycle.AFTER_END, () => isGameOver(true));
    game.subscribe(LifeCycle.AFTER_START, () => isGameOver(false));

    setTimeout(() => game.start());
  };

  return (
    <Layout>
      <div class={'flex items-center gap-4'}>
        <h1 class={'w-fit'}>{capitalize(gameId)} 单人模式</h1>
        {isGameOver() && <Button onClick={handleStart} variant={'primary'}>启动</Button>}
        {isGameOver() && tape() &&
          <Button onClick={handleSave} variant={'primary'}>保存</Button>
        }
      </div>
      <div ref={el => gameRef = el} class={'w-full aspect-ratio-video flex items-center justify-center bg-black'} />
    </Layout>
  );
};

export default SingleMode;