import { useParams } from '@solidjs/router';
import { createEffect, For, Show } from 'solid-js';
import { capitalize } from 'lodash-es';
import { LifeCycle } from '@soku-games/core';
import { Button, Input, Layout } from '@soku-solid/ui';
import { useSignal } from '@soku-solid/utils';
import { PreRoom, PreRoomEvent } from './types';
import { INITIAL_PRE_ROOM } from './constants';
import { createGame, createSocket, cx, useSaveTape } from '@/utils';
import { getGame, jwt, user } from '@/store';
import { BotSelect } from '@/business/components';
import { makeRoomWrapper } from '@/pages/game/[id]/custom/utils';
import { useHandleEvents } from '@/pages/game/[id]/custom/hooks';


// FIXME: 如果游戏结束后还保持继续游戏，则会出现上一个游戏还没销毁的 bug ，需要修复

const CustomMode = () => {
  const [socket, connect, isConnect] = createSocket(import.meta.env.VITE_WS_URL, jwt.v() ?? '');
  const stage = useSignal(0);

  const gameId = useParams().id;

  const inputRoomId = useSignal('');
  const joinedPreRoomId = useSignal('');

  const handleToLeave = () => {
    const wrap = makeRoomWrapper(joinedPreRoomId.v() ?? '');
    socket()?.emit(wrap(PreRoomEvent.LeavePreRoom));
    preRoom.s(INITIAL_PRE_ROOM);
    joinedPreRoomId.s('');
    stage.s(0);
  };

  const preRoom = useSignal<PreRoom>(INITIAL_PRE_ROOM);

  const selectedBot = useSignal<string[]>(Array.from({ length: getGame(gameId)?.playerCount ?? 0 }, () => ''));
  const handleChange = (value: string, index: number) => {
    const arr = selectedBot.v()!;
    arr[index] = value;
    selectedBot.s([...arr]);
  };

  useHandleEvents({
    socket,
    preRoomId: joinedPreRoomId,
    preRoom,
    stage,
  });

  const gameRef: { v?: HTMLElement } = {};
  const [game, tape] = createGame(socket, preRoom.v, gameRef, gameId);
  createEffect(() => game()?.subscribe(LifeCycle.AFTER_START, () => stage.s(3)));
  createEffect(() => game()?.subscribe(LifeCycle.AFTER_END, () => stage.s(0)));

  const handleToSave = useSaveTape(tape, gameId);

  const handleToCreate = () => {
    socket()?.emit(PreRoomEvent.CreatePreRoom, {
      gameId,
    });
  };

  const handleToJoin = () => {
    socket()?.emit(PreRoomEvent.JoinPreRoom, {
      roomId: inputRoomId.v(),
      gameId,
    });
  };

  const handleToSeat = (index: number) => {
    const wrap = makeRoomWrapper(joinedPreRoomId.v() ?? '');
    socket()?.emit(wrap(PreRoomEvent.SeatPreRoom), {
      index,
      botId: selectedBot.v()![index],
    });
  };

  const handleToUnseat = (index: number) => {
    const wrap = makeRoomWrapper(joinedPreRoomId.v()!);
    socket()?.emit(wrap(PreRoomEvent.UnseatPreRoom), {
      index,
    });
  };

  const handleToStart = () => {
    const wrap = makeRoomWrapper(joinedPreRoomId.v()!);
    socket()?.emit(wrap(PreRoomEvent.StartGame));
  };


  return (
    <Layout>
      <div class={'flex gap-4 items-center'}>
        <h1>{capitalize(gameId)} 自由模式</h1>
        <Button size={'lg'} onClick={connect}>接入网络</Button>
      </div>
      <Show when={jwt.v()} fallback={<h1>你还未登陆，请先登陆！</h1>}>
        <div class={'flex-1 bg-black w-full aspect-ratio-video center'} ref={el => gameRef.v = el}>
          <h1 class={'text-white'}>NO SIGNAL</h1>
        </div>
        <div class={'flex-0 p-5 w-300px box-border'}>
          <Show when={isConnect()}>
            <Show when={stage.v() === 0}>
              <div class={'w-fit font-600 mt-3'}>你可以</div>
              <Button class={'w-full'} variant={'success'} onClick={handleToCreate}>创建房间</Button>
              <div class={'w-fit font-600 mt-3'}>亦可以</div>
              <Input
                width={'100%'}
                onChange={inputRoomId.s}
                placeholder={'请输入房间号'}
              />
              <Button class={'w-full mt-3'} variant={'primary'} onClick={handleToJoin}>加入房间</Button>
              {tape() && <Button class={'w-full mt-3'} onClick={handleToSave}>保存录像</Button>}
            </Show>
            <Show when={stage.v() === 1}>
              <Button variant={'danger'} onClick={handleToLeave}>离开房间</Button>
              <div class={'mt-5'}>
                <div>房间号：{preRoom.v()!.roomId}</div>
                <div class={'mt-5 flex items-center gap-3'}>
                  <div>房主：{preRoom.v()!.ownerId}</div>
                  <Show when={preRoom.v()!.ownerId === user.v()?.id}>
                    <Button size={'sm'} variant={'success'} onClick={handleToStart}>开始游戏</Button>
                  </Show>
                </div>
                <div class={'mt-5'}>玩家席</div>
                <For each={preRoom.v()!.players}>
                  {({ playerId, botId }, index) =>
                    <Show
                      when={playerId}
                      fallback={
                        <div class={'my-3'}>
                          <BotSelect value={selectedBot.v()![index()]} onChange={(value) => handleChange(value ?? '', index())} gameId={gameId} />
                          <Button class={'w-full mt-2'} onClick={() => handleToSeat(index())}>坐下</Button>
                        </div>
                      }
                    >
                      <div class={cx(
                        'flex gap-3 my-3 items-center rounded-2 border-1 border-solid border-gray/8 shadow-xl px-2 py-3',
                        preRoom.v()!.players[index()].playerId === user.v()?.id && 'justify-between',
                      )}>
                        <div>{botId ? '[BOT]' : ''}{playerId}</div>
                        <Show when={preRoom.v()!.players[index()].playerId === user.v()?.id}>
                          <Button onClick={() => handleToUnseat(index())} variant={'danger'}>离座</Button>
                        </Show>
                      </div>
                    </Show>
                  }
                </For>
                <div class={'mt-5'}>观众席</div>
                <For each={preRoom.v()!.clients}>
                  {(client) => <div class={'mt-1 rounded-2 shadow-md px-3 py-3'}>{client}</div>}
                </For>
              </div>
            </Show>
            <Show when={stage.v() === 2}>
                Starting Game...
            </Show>
            <Show when={stage.v() === 3}>
              GO!
            </Show>
          </Show>
        </div>
      </Show>
    </Layout>
  );
};

export default CustomMode;