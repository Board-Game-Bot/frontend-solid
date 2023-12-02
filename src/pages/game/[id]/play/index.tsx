import { useParams } from '@solidjs/router';
import { onMount, Show } from 'solid-js';
import { buildGame, LifeCycle, NewGenerator } from '@soku-games/core';
import { Button, Layout } from '@/components';
import { signal, useSaveTape } from '@/utils';

const GamePlayPage = () => {
  const params = useParams();
  const gameId = params.id;
  let gameRef: HTMLDivElement;

  const tape = signal<any>({});
  const isOver = signal(false);

  const handleStart = () => {
    const game = buildGame({
      name: gameId,
      plugins: [
        `${gameId}-validator`,
        {
          name: `${gameId}-screen`,
          extra: {
            el: gameRef,
            couldControl: [true, true],
            emit: (stepStr: string) => {
              game?.step(stepStr);
            },
          },
        },
        {
          name: 'the-recorder',
          extra: {
            tapeResolved: (theTape: any) => tape(theTape),
          },
        },
      ],
    })!;
    const data = NewGenerator(gameId).generate();
    game.prepare(data);

    game.subscribe(LifeCycle.AFTER_END, () => isOver(true));

    setTimeout(() => {
      game.start();
    });
    isOver(false);
  };

  onMount(handleStart);

  const handleSave = useSaveTape(tape, gameId);

  return (
    <Layout>
      <div class={'mt-10'}>
        <div class={'w-1200px aspect-ratio-video flex items-center justify-center'} ref={el => gameRef = el} />
        <Show when={isOver()}>
          <h3>你的对局记录在此，是否保存？</h3>
          <Button onClick={handleSave} variant={'success'}>保存</Button>
          <h3>还没玩明白？</h3>
          <Button onClick={handleStart} variant={'primary'}>再来一局</Button>
        </Show>
      </div>
    </Layout>
  );
};

export default GamePlayPage;