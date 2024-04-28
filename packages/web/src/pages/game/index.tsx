import { createSignal, Show } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { Layout, List } from '@soku-solid/ui';
import { SolidMarkdown } from 'solid-markdown';
import { GameCard, ModeCard } from './components';
import { games } from '@/store';
import { MODE } from '@/pages/game/constants';
import { ModeType } from '@/pages/game/types';
import { Game } from '@/api/entity';
import { client } from '@/api';

const GamePage = () => {
  const navigate = useNavigate();

  const stage = createSignal(0);

  const currentDescription = createSignal('');

  const selectedGame = createSignal<Game>();
  const handleSelectGame = async (game: Game) => {
    if (game === selectedGame[0]()) {
      stage[1](0);
      selectedGame[1]();
    }
    else {
      stage[1](1);
      selectedGame[1](game);
      const { Description = '' } = await client.GetGame({ Id: game.Id });
      currentDescription[1](Description);
    }
  };

  const handleSelect = (mode: ModeType) => {
    navigate(`/game/${selectedGame[0]()!.Id}/${mode.key}`);
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
                onClick={() => handleSelectGame(game)}
              />
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