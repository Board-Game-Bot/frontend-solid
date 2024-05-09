import { Socket } from 'socket.io-client';
import { capitalize } from 'lodash-es';
import { createEffect, createMemo, createSignal, For, on, Show } from 'solid-js';
import { Button, CopiableText } from '@soku-solid/ui';
import { AudienceCard, JoinCard, PlayerCard } from '@/pages/game/room/components';
import { Room } from '@/pages/game/types';
import { SocketRequest } from '@/pages/game/message';
import { user as userStore } from '@/store';
import { Rate } from '@/api/entity';
import { client } from '@/api';

interface Props {
    socket?: Socket;
    room?: Room;
}

export const StageOne = (props: Props) => {
  const room = () => props.room;
  const game = () => props.room?.Game;
  const [user] = userStore;
  const players = () => props.room?.Players;
  const audience = () => props.room?.Audience;

  const isPlayer = createMemo(() => {
    return players()?.some(player => player.User.Id === user()?.Id);
  });
  const isReady = createMemo(() => {
    return room()?.Players.filter(player => player.User.Id === user()?.Id)
      .every(player => player.IsReady);
  });
  const handleReady = () => {
    props.socket?.emit(SocketRequest.ReadyRequest, {
      RoomId: room()?.Id,
    });
  };

  const handleTurnAudience = () => {
    props.socket?.emit(SocketRequest.TurnAudienceRequest, {
      RoomId: room()?.Id,
    });
  };

  const handleJoin = (botId: string) => {
    props.socket?.emit(SocketRequest.TurnPlayerRequest, {
      RoomId: room()?.Id,
      BotId: botId,
    });
  };

  const [rates, setRates] = createSignal<Rate[]>([]);
  createEffect(on(() => players()?.length, async () => {
    const gameId = game()?.Id;
    const playerIds = players()?.map(player => player.User.Id);
    const botIds = players()?.map(player => player.Bot?.Id ?? '');
    if (!gameId || !playerIds || !botIds) return ;

    const { Items: rates } = await client.ListRates({
      WithRank: true,
      Filter: {
        GameIds: [gameId],
        UserIds: playerIds,
        BotIds: botIds,
      },
    });
    setRates(players()?.map(
      player => rates.find(
        rate => rate.UserId === player.User.Id && (rate.BotId ?? '') === (player.Bot?.Id ?? ''),
      )!,
    ) ?? []);
  }));

  return (
    <>
      <h1>Here is The Room of Playing {game()?.Icon} {capitalize(game()?.Id)}</h1>
      <h2>Room ID: <CopiableText text={room()?.Id ?? ''}/></h2>
      <div class={'flex gap-4'}>
        <Show when={isPlayer()}>
          <Show
            when={isReady()}
            fallback={
              <Button class={'bg-green text-2xl text-white'} onClick={handleReady}>
                            👉 Are You OK?
              </Button>
            }
          >
            <Button class={'bg-red text-2xl text-white'} onClick={handleReady}>
                        🤔 I'm Not Sure...
            </Button>
          </Show>
          <Button class={'bg-blue text-2xl text-white'} onClick={handleTurnAudience}>Be an Audience</Button>
        </Show>
      </div>
      <div class={'w-full h-400px flex gap-3 mt20px'}>
        <div class={'flex-1 h-full flex gap-4'}>
          {<For each={players()}>{(player, index) =>
            <PlayerCard gameId={game()?.Id} player={player} rate={rates()[index()]}/>
          }</For>}
          <Show when={(players()?.length ?? 0) < (room()?.Game.PlayerCount ?? 0)}>
            <JoinCard onJoin={handleJoin} gameId={room()?.Game.Id}/>
          </Show>
        </div>
        <div class={'flex-0 w-400px flex flex-col gap-3'}>
          {<For each={audience()}>{(audience) =>
            <AudienceCard audience={audience}/>
          }</For>}
        </div>
      </div>
    </>
  );
};