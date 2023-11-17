import { createSignal, For, onMount } from 'solid-js';
import { ContentBox } from '@/components/common';
import { useNavigate } from '@solidjs/router';
import { Game, gameGetAllApi } from '@/api/game';

export default function GameTotalView() {
  const [focus, setFocus] = createSignal('');
  const [games, setGames] = createSignal<Game[]>([]);
  const navigate = useNavigate();

  onMount(() => {
    gameGetAllApi()
      .then((resp) => {
        setGames(resp.data.games);
      })
      .catch(() => {
        alert('获取游戏失败，请刷新重新进入');
      });
  });

  function handleClick(id: string) {
    if (focus() === id) {
      setFocus('');
    } else {
      setFocus(id);
    }
  }

  function handleEnterGame(id: string) {
    navigate(`/game/${id}`);
  }

  return (
    <ContentBox>
      <For each={games()}>
        {(game) => (
          <div
            onClick={() => handleClick(game.id)}
            class="bg-#fefefe px-5 py-4 my-4 rounded-lg shadow-2xl cursor-pointer transition hover:scale-110"
          >
            <div class="flex items-center gap-4">
              <span class="text-5xl">{game.icon}</span>
              <span class="text-3xl">{game.title}</span>
            </div>
            {focus() === game.id && (
              <>
                <div class="p-5">
                  <For each={game.description.split('\n')}>
                    {(para) => <p>{para}</p>}
                  </For>
                </div>
                <div class="w-full relative flex flex-row-reverse">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEnterGame(game.id);
                    }}
                  >
                    进入游戏
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </For>
    </ContentBox>
  );
}
