import { useParams } from '@solidjs/router';
import { For, Show } from 'solid-js';
import { PreRoom } from './types';
import { createEvent, createGame, createSocket, signal, useSaveTape } from '@/utils';
import { getGame, jwt, user } from '@/store';
import { Button, Input } from '@/components';
import { BotSelect } from '@/business/components';

const CustomMode = () => {
  const [socket, connect, isConnect] = createSocket(import.meta.env.VITE_WS_URL, jwt());
  const gameId = useParams().id;

  const roomId = signal('');
  const joinedPreRoomId = signal('');

  const handleCreatePreRoom = () => {
    socket()?.emit('create-preroom', { gameId });
  };
  createEvent(socket, 'create-preroom', ({ roomId }) => {
    joinedPreRoomId(roomId);
  });

  const handleJoinPreRoom = () => {
    socket()?.emit('join-preroom', {
      roomId: roomId(),
      gameId,
    });
  };
  createEvent(socket, 'join-preroom', ({ roomId }) => {
    joinedPreRoomId(roomId);
  });

  const wrap = (event: string) => `preroom-${joinedPreRoomId()}(${event})`;

  const handleLeavePreRoom = () => {
    socket()?.emit(wrap('leave'));
  };

  createEvent(socket, () => wrap('disband'), () => {
    joinedPreRoomId('');
  });
  const preRoom = signal<PreRoom>({
    roomId: '',
    clients: [],
    players: [],
    ownerId: '',
  });
  createEvent(socket, () => wrap('sync'), (room) => {
    preRoom(room);
  });

  const selectedBot = signal<string[]>(Array.from({ length: getGame(gameId)?.playerCount ?? 0 }, () => ''));
  const handleChange = (value: string, index: number) => {
    const arr = selectedBot();
    arr[index] = value;
    selectedBot([...arr]);
  };
  const handleSeat = (index: number) => {
    socket()?.emit(wrap('seat'), {
      index,
      botId: selectedBot()[index],
    });
  };

  const handleUnseat = (index: number) => {
    socket()?.emit(wrap('unseat'), {
      index,
    });
  };

  const handleStart = () => {
    socket()?.emit(wrap('start'));
  };

  const gameRef: { v?: HTMLElement } = {};
  const [game, tape] = createGame(socket, preRoom, gameRef, gameId);
  const handleSave = useSaveTape(tape, gameId);

  return (
    <Show
      when={jwt()}
      fallback={
        <h1>你还未登陆，请先登陆！</h1>
      }
    >
      <Show
        when={isConnect()}
        fallback={
          <Button onClick={connect}>接入网络</Button>
        }
      >
        <Show
          when={joinedPreRoomId()}
          fallback={
            <>
              <h2>你可以</h2>
              <Button variant={'success'} onClick={handleCreatePreRoom}>创建房间</Button>
              <h2>亦可以</h2>
              <div class={'flex gap-4'}>
                <Input width={500} onChange={roomId} placeholder={'请输入房间号'} />
                <Button variant={'primary'} onClick={handleJoinPreRoom}>加入房间</Button>
              </div>
            </>
          }
        >
          <Show when={!game()}>
            <Button variant={'danger'} onClick={handleLeavePreRoom}>离开房间</Button>
            <h2>房间号：{preRoom().roomId}</h2>
            <div class={'flex items-center gap-3'}>
              <h2>房主：{preRoom().ownerId}</h2>
              <Show when={preRoom().ownerId === user()?.id}>
                <Button variant={'success'} onClick={handleStart}>开始游戏</Button>
              </Show>
            </div>
            <h2>观众席：</h2>
            <For each={preRoom().clients}>
              {(client) =>
                <h3>{client}</h3>
              }
            </For>
            <h2>玩家席</h2>
            <For each={preRoom().players}>
              {({ playerId, botId }, index) =>
                <Show
                  when={playerId}
                  fallback={
                    <div class={'flex gap-3 my-3'}>
                      <BotSelect value={selectedBot()[index()]} onChange={(value) => handleChange(value, index())} gameId={gameId} width={200} />
                      <Button onClick={() => handleSeat(index())}>坐下</Button>
                    </div>
                  }
                >
                  <div class={'flex gap-3 my-3 items-center'}>
                    <div>{botId ? '[BOT]' : ''}{playerId}</div>
                    <Show when={preRoom().players[index()].playerId === user()?.id}>
                      <Button onClick={() => handleUnseat(index())} variant={'danger'}>离座</Button>
                    </Show>
                  </div>
                </Show>
              }
            </For>
          </Show>
          <div class={'w-1200px aspect-ratio-video flex justify-center items-center'} ref={el => gameRef.v = el} />
        </Show>
      </Show>
      <Show when={tape()}>
        <h3>对局记录已生成，是否保存？</h3>
        <Button onClick={handleSave} variant={'success'}>保存</Button>
      </Show>
    </Show>
  );
};

export default CustomMode;