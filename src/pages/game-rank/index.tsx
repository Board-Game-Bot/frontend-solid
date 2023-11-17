import { ContentBox } from '@/components/common';
import Table from '@/components/common/Table';
import { useRequest } from '@/utils/util';
import { Game, gameGetAllApi } from '@/api/game';
import { createSignal, onMount } from 'solid-js';
import { rankGetByGameIdApi } from '@/api/rank';

const rankColumns = [
  {
    key: 'id',
    title: '标识',
  },
  {
    key: 'name',
    title: '名字',
  },
  {
    key: 'score',
    title: '分数',
  },
];

export default function GameRankView() {
  const [data, , isLoading, runGetAllGame] = useRequest(gameGetAllApi);
  const [, , , runGetRanks] = useRequest(rankGetByGameIdApi);

  onMount(async () => {
    await runGetAllGame();
  });

  const games = () => data()?.games;

  const [focus, setFocus] = createSignal('');
  const [ranksCache, setRanksCache] = createSignal<Record<string, any[]>>({});

  async function handleClick(id: string) {
    if (id === focus()) {
      setFocus('');
    } else {
      setFocus(id);
      if (!ranksCache()[id]) {
        const [data, err] = await runGetRanks(id);
        if (err) {
          alert(err.message);
          return;
        }
        if (!err && data) {
          setRanksCache({
            ...ranksCache(),
            [id]: data.ranks.map((rank: any) => ({
              ...rank,
              id: <code>{rank.id.slice(0, 8)}...</code>,
              score: <code>{rank.score}</code>,
            })),
          });
        }
      }
    }
  }

  return (
    <ContentBox>
      <h1>Game Rank View</h1>
      {isLoading() && <h1 class="font-thin text-7xl">获取游戏中...</h1>}
      {!isLoading() &&
        games() &&
        games().map((game: Game) => (
          <div
            class="bg-#fefefe px-5 py-4 my-4 rounded-lg shadow-2xl cursor-pointer transition hover:scale-110"
            onClick={() => handleClick(game.id)}
          >
            <div class="flex items-center gap-4">
              <span class="text-5xl">{game.icon}</span>
              <span class="text-3xl">{game.title}</span>
            </div>
            {focus() === game.id && !ranksCache()[game.id] && (
              <h1 class="font-thin">获取数据中...</h1>
            )}
            {focus() === game.id && ranksCache()[game.id] && (
              <div class="w-full bg-gray-2 mt-3">
                <Table columns={rankColumns} data={ranksCache()[game.id]} />
              </div>
            )}
          </div>
        ))}
    </ContentBox>
  );
}
