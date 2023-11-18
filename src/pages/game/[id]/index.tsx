import { useParams } from '@solidjs/router';
import { createSignal, Show } from 'solid-js';
import { capitalize } from 'lodash-es';
import { DebugMode, MultiMode, SingleMode } from './components';
import { Layout, RadioGroup } from '@/components';
import { getGame } from '@/store';

const GameDetailPage = () => {
  const params = useParams();
  const gameId = params.id;

  const game = () => getGame(gameId);

  const options: Record<string, string> = {
    'single': '单人模式',
    'multi': '多人模式',
    'debug': '调试模式',
  };

  const [mode, setMode] = createSignal('single');

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
        <RadioGroup class={'m-auto'} items={options} onChange={setMode} />
        <Show when={mode() === 'single'}>
          <SingleMode />
        </Show>
        <Show when={mode() === 'multi'}>
          <MultiMode />
        </Show>
        <Show when={mode() === 'debug'}>
          <DebugMode />
        </Show>
      </Show>
    </Layout>
  );
};

export default GameDetailPage;
