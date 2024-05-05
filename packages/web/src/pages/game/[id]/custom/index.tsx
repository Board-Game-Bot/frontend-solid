import { useNavigate, useParams } from '@solidjs/router';
import { Input, Layout, Button } from '@soku-solid/ui';
import { capitalize } from 'lodash-es';
import { createEffect, createSignal, onMount } from 'solid-js';
import { createSocket, useRequest } from '@/utils';
import { client } from '@/api';
import { jwt as jwtStore } from '@/store';
import { SocketRequest, SocketResponse } from '@/pages/game/message';

const CustomMode = () => {
  const params = useParams();
  const gameId = params.id;

  const { data: game } = useRequest(() => client.GetGame({ Id: gameId }), { auto: true });
  const [jwt] = jwtStore;

  const [socket, connect] = createSocket(import.meta.env.VITE_WS_URL, jwt());
  onMount(() => {
    connect();
  });

  const [roomId, setRoomId] = createSignal('');
  const handleJoin = () => {
    navigate(`/game/room/${roomId()}`);
  };

  const handleCreate = () => {
    socket()?.emit(SocketRequest.MakeRoomRequest, { RoomId: roomId(), GameId: gameId });
  };

  const navigate = useNavigate();
  createEffect(() => {
    const _socket = socket();
    if (!_socket) {
      return;
    }
    _socket.on(SocketResponse.MakeRoomResponse, (roomId) => {
      navigate(`/game/room/${roomId}`);
    });
  });

  return (
    <Layout>
      <h1>Here is the Custom Mode of {capitalize(game()?.Id)} Game.</h1>
      <h1>You can Join a Room by Input a Room ID.</h1>
      <h1>Or Create a Room by Input(or not) a Room ID.</h1>
      <div class={'flex flex-col gap-4'}>
        <Input class={'text-4xl w-full'} width={''} value={roomId()} onChange={setRoomId} />
        <div class={'flex items-center gap-4'}>
          <Button class={'text-xl flex-1'} onClick={handleJoin}>Join</Button>
          <Button class={'text-xl flex-1'} onClick={handleCreate}>Create</Button>
        </div>
      </div>
    </Layout>
  );
};

export default CustomMode;