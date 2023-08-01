import { ContentBox } from '@/components/common';
import { useParams } from '@solidjs/router';
import { useRequest } from '@/utils/util';
import { gameGetOneApi } from '@/api/game';
import { onMount } from 'solid-js';

export default function GameSingle() {
  const { id } = useParams();
  const [data, , isLoading, run] = useRequest(gameGetOneApi);
  const game = () => data()?.game;

  onMount(() => {
    run(id);
  });

  return (
    <ContentBox>
      {!isLoading() && game() && (
        <div class="full">
          <h1 class="flex gap-3">
            <div class="text-7xl">{game().icon}</div>
            <div class="pl-4 flex items-end text-5xl h-auto">
              {game().title}
            </div>
          </h1>
        </div>
      )}
      {!isLoading() && !game() && (
        <h1 class="text-7xl font-thin">不存在这个游戏</h1>
      )}
      {isLoading() && <h1 class="font-thin">获取中...</h1>}
    </ContentBox>
  );
}
