import { For } from 'solid-js';
import { capitalize } from 'lodash-es';
import { useNavigate } from '@solidjs/router';
import { GetGamesReq } from './requests';
import { GameCard } from './components';
import { Layout } from '@/components';
import { useRequest, loadingMap } from '@/utils';
import { Game } from '@/types';
import { games, setGames } from '@/store';

const GamePage = () => {
  useRequest(
    GetGamesReq,
    {
      auto: true,
      onSuccess: ({ games }) => {
        setGames(games);
      },
    },
  );

  const navigate = useNavigate();
  const handleClick = (game: Game) => {
    navigate(`/game/${game.id}`);
  };

  return (
    <Layout>
      <h1 class={'center text-12'}>选择你的游戏</h1>
      <div class={'w-full flex flex-wrap'}>
        <For each={games()}>
          {(game) =>
            <GameCard
              loading={loadingMap()[`${game.npmPackage}-${game.version}`] !== 2}
              icon={game.icon}
              name={capitalize(game.id)}
              onClick={() => handleClick(game)}
            />
          }
        </For>
      </div>
      <h1 class={'center text-8 text-gray'}>更多游戏敬请期待！</h1>
    </Layout>
  );
};

export default GamePage;