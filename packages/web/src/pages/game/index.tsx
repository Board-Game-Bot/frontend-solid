import { createSignal, Show } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { Layout, List } from '@soku-solid/ui';
import { SolidMarkdown } from 'solid-markdown';
import { GameCard, ModeCard } from './components';
import { Game } from '@/types';
import { games } from '@/store';
import { MODE } from '@/pages/game/constants';
import { ModeType } from '@/pages/game/types';

const GamePage = () => {
  const navigate = useNavigate();

  const stage = createSignal(0);

  const currentDescription = createSignal('');

  const handleHoverGame = (game: Game) => {
    currentDescription[1](game.description);
  };

  const selectedGame = createSignal<Game>();
  const handleSelectGame = (game: Game) => {
    stage[1](1);
    selectedGame[1](game);
  };

  const handleSelect = (mode: ModeType) => {
    navigate(`/game/${selectedGame[0]()!.id}/${mode.key}`);
  };

  return (
    <Layout>
      <h1 class={'center text-12'}>选择游戏以及模式</h1>
      <div class={'flex gap-4'}>
        <List
          class={'bg-#eee p5 flex flex-col gap-3'}
          height={'70vh'}
          items={games[0]()!}
          renderer={(game) => {
            return (
              <GameCard
                selected={selectedGame[0]() === game}
                game={game}
                onMouseEnter={() => handleHoverGame(game)}
                onClick={() => handleSelectGame(game)} />
            );
          }}
        />
        <Show when={stage[0]()! > 0}>
          <List
            class={'bg-#eee p5 flex flex-col gap-3'}
            items={MODE}
            renderer={(mode) => 
              <ModeCard
                onClick={() => handleSelect(mode)}
                onMouseEnter={() => currentDescription[1](mode.label)}
                mode={mode}
              />
            }
          />
        </Show>

        <Show when={currentDescription[0]()}>
          <div class={'h-70vh bg-#eee p5 w-500px overflow-auto'}>
            <SolidMarkdown>
              {currentDescription[0]()}
            </SolidMarkdown>
          </div>
        </Show>
      </div>
    </Layout>
  );
};

export default GamePage;