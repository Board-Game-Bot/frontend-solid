import { Show } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { Layout, List } from '@soku-solid/ui';
import { useSignal } from '@soku-solid/utils';
import { SolidMarkdown } from 'solid-markdown';
import { GameCard, ModeCard } from './components';
import { Game } from '@/types';
import { games } from '@/store';
import { MODE } from '@/pages/game/constants';
import { ModeType } from '@/pages/game/types';

const GamePage = () => {
  const navigate = useNavigate();


  const stage = useSignal(0);

  const currentDescription = useSignal('');

  const handleHoverGame = (game: Game) => {
    console.log('desc', game.description);
    currentDescription.s(game.description);
  };

  const selectedGame = useSignal<Game>();
  const handleSelectGame = (game: Game) => {
    stage.s(1);
    selectedGame.s(game);
  };

  const handleSelect = (mode: ModeType) => {
    navigate(`/game/${selectedGame.v()!.id}/${mode.key}`);
  };

  return (
    <Layout>
      <h1 class={'center text-12'}>选择游戏以及模式</h1>
      <div class={'flex gap-4'}>
        <List
          class={'bg-#eee p5 flex flex-col gap-3'}
          height={'70vh'}
          items={games()}
          renderer={(game) => {
            return (
              <GameCard
                selected={selectedGame.v() === game}
                game={game}
                onMouseEnter={() => handleHoverGame(game)}
                onClick={() => handleSelectGame(game)} />
            );
          }}
        />
        <Show when={stage.v()! > 0}>
          <List
            class={'bg-#eee p5 flex flex-col gap-3'}
            items={MODE}
            renderer={(mode) => 
              <ModeCard
                onClick={() => handleSelect(mode)}
                onMouseEnter={() => currentDescription.s(mode.label)}
                mode={mode}
              />
            }
          />
        </Show>

        <Show when={currentDescription.v()}>
          <div class={'h-70vh bg-#eee p5 w-500px overflow-auto'}>
            <SolidMarkdown>
              {console.log('solid-markdownxxxx'), currentDescription.v()}
            </SolidMarkdown>
          </div>
        </Show>
      </div>
    </Layout>
  );
};

export default GamePage;