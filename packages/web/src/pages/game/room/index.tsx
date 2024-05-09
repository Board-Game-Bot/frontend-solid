import { useLocation, useParams } from '@solidjs/router';
import { createEffect, createSignal, Match, onMount, Show, Switch } from 'solid-js';
import { Layout } from '@soku-solid/ui';
import { createSocket } from '@/utils';
import { jwt as jwtStore } from '@/store';
import { NetworkResponse, SocketRequest, SocketResponse } from '@/pages/game/message';
import { Room } from '@/pages/game/types';
import { StageOne, StageTwo } from '@/pages/game/room/components';
import { useBotId } from '@/pages/game/hooks';

const GameRoom = () => {
  const params = useParams();
  const query = useLocation().query;
  
  const roomId = params.id;
  const [jwt] = jwtStore;

  const [socket, connect, isConnect] = createSocket(import.meta.env.VITE_WS_URL, jwt());

  onMount(() => {
    connect();
  });

  const [room, setRoom] = createSignal<Room>();
  const localBotId = useBotId();

  createEffect(() => {
    if (!isConnect()) return;

    const _socket = socket()!;
    _socket.on(SocketResponse.SyncRoomResponse, (room: Room) => {
      setRoom(room);
    });
    _socket.emit(SocketRequest.JoinRoomRequest, {
      RoomId: roomId,
      IsPlayer: query.IsPlayer === 'true',
      BotId: localBotId.get(),
    });
    _socket.on(NetworkResponse.ReadyResponse, function listener() {
      setStage(1);
      _socket.off(NetworkResponse.ReadyResponse, listener);
    });
  });
  const [stage, setStage] = createSignal(0);

  return (
    <Layout>
      <Switch>
        <Match when={stage() === 0}>
          <StageOne room={room()} socket={socket()}/>
        </Match>
        <Match when={stage() === 1}>
          <StageTwo room={room()} socket={socket()}/>
        </Match>
      </Switch>
    </Layout>
  );
};
export default GameRoom;