import { useNavigate, useParams } from '@solidjs/router';
import { Show, For } from 'solid-js';
import { capitalize } from 'lodash-es';
import { Button, Layout } from '@/components';
import { getGame } from '@/store';

const GameDetailPage = () => {
  const params = useParams();
  const gameId = params.id;

  const game = () => getGame(gameId);

  const options: Record<string, string> = {
    'single': '单人模式',
    'multi': '多人模式',
    'custom': '自由模式',
    'live': '直播模式',
  };

  const navigate = useNavigate();

  return (
    <Layout>
      <Show
        when={!!game()}
        fallback={(
          <h1 class={'text-7xl text-center'}>游戏加载失败</h1>
        )}
      >
        <h1 class={'text-center text-6xl'}>{game()!.icon} {capitalize(game()!.id)}</h1>
        <h2 class={'text-center text-3xl text-gray'}>{game()!.description}</h2>
        <div class={'flex gap-4 justify-center items-center'}>
          <For each={Object.entries(options)}>{([mode, title]) =>
            <Button
              size={'lg'}
              onClick={() => navigate(`/game/${gameId}/${mode}`)}
            >
              {title}
            </Button>
          }</For>
        </div>
      </Show>
    </Layout>
  );
};

export default GameDetailPage;
