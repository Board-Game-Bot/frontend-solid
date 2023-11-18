import { useParams } from '@solidjs/router';
import { onMount } from 'solid-js';
import { buildGame, NewGenerator } from '@soku-games/core';
import { Layout } from '@/components';

const GamePlayPage = () => {
  const params = useParams();
  const gameId = params.id;
  let gameRef: HTMLDivElement;

  onMount(() => {
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
      ],
    })!;
    const data = NewGenerator(gameId).generate();
    game.prepare(data);

    setTimeout(() => {
      game.start();
    });
  });

  return (
    <Layout>
      <div class={'mt-10'}>
        <div class={'m-auto'} ref={el => gameRef = el} />
      </div>
    </Layout>
  );
};

export default GamePlayPage;