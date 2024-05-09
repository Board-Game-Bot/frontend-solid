import { Layout, Button } from '@soku-solid/ui';
import { useNavigate, useParams } from '@solidjs/router';
import { createEffect, createSignal, onMount, Show } from 'solid-js';
import { capitalize } from 'lodash-es';
import { createSocket } from '@/utils';
import { jwt as jwtStore, user as userStore } from '@/store';
import { BotSelect } from '@/business/components';
import { client } from '@/api';
import { Rate } from '@/api/entity';
import { SocketRequest, SocketResponse } from '@/pages/game/message';
import { useBotId } from '@/pages/game/hooks';


const MatchMode = () => {
  const gameId = useParams().id;
  const [jwt] = jwtStore;
  const [user] = userStore;

  const [socket, connect, isConnect] = createSocket(import.meta.env.VITE_WS_URL, jwt() ?? '');
  onMount(() => {
    connect();
  });
  const [botId, setBotId] = createSignal('');
  const [rate, setRate] = createSignal<Rate>();
  createEffect(async () => {
    const UserId = user()?.Id;
    const GameId = gameId;
    const BotId = botId();
    if (!UserId || !GameId) return;

    const rate = await client.GetRate({ UserId, GameId, BotId });
    setRate(rate);
  });


  const navigate = useNavigate();
  const [isMatching, setMatching] = createSignal(false);
  const handleMatch = () => {
    if (isMatching()) {
      socket()?.emit(SocketRequest.LeaveMatchRequest);
    }
    else {
      socket()?.emit(SocketRequest.JoinMatchRequest, {
        GameId: gameId,
        BotId: botId(),
      });
    }
    setMatching(im => !im);
  };
  const localBotId = useBotId();
  createEffect(() => {
    if (!isConnect()) return ;
    socket()?.on(SocketResponse.MakeRoomResponse, function listener(roomId: string) {
      socket()?.off(SocketResponse.MakeRoomResponse, listener);
      localBotId.post(botId());
      navigate(`/game/room/${roomId}?IsPlayer=true`);
    });
  });


  return (
    <Layout>
      <div class={'w-full h-full flex justify-center items-center'}>
        <div class={'flex flex-col items-center mt100px p20px shadow-xl'}>
          <img alt={'avatar'} src={user()?.Avatar} class={'w-200px rounded-full '} classList={{ 'animate-spin': isMatching() }} />
          <div class={'mt50px text-5xl'}>
            {user()?.Name}
          </div>
          <div class={'text-3xl flex items-center gap-4 mt5'}> Selected Bot</div>
          <div class={'w-full text-4xl'}>
            <BotSelect class={'text-4xl'} value={botId()} onChange={setBotId} gameId={gameId}/>
          </div>
          <div class={'text-5xl font-600 mt10'}> The Score in {capitalize(gameId)} </div>
          <div class={'text-6xl text-shadow-xl'}> {rate()?.Score} </div>
          <div class={'text-5xl font-600 mt10'}> The Rank in {capitalize(gameId)} </div>
          <div class={'text-6xl text-shadow-xl'}> No.{rate()?.Rank} </div>
          <Button class={'text-6xl mt10'} style={{ padding: '20px' }} onClick={handleMatch}>
            <Show when={isMatching()} fallback={'Start Matching'}>
              Cancel Matching
            </Show>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default MatchMode;