import { Accessor, createEffect, Signal } from 'solid-js';
import { Socket } from 'socket.io-client';
import { PreRoom, PreRoomEvent } from '../types';
import { makeRoomWrapper } from '../utils';
import { INITIAL_PRE_ROOM } from '../constants';

interface Props {
    socket: Accessor<Socket | undefined>;
    preRoomId: Signal<string>;
    preRoom: Signal<PreRoom>;
    stage: Signal<number>;
}

export const useHandleEvents = (props: Props) => {
  const { socket, preRoomId, stage, preRoom } = props;

  /**
   * 创建一个房间
   * 建立：创建前
   * 销毁：创建后
   */
  const handleCreatePreRoom = (room: PreRoom) => {
    preRoomId[1](room.roomId);
    preRoom[1](room);
    stage[1](1);
  };
  createEffect(() => {
    const roomId = preRoomId[0](), _socket = socket();
    if (roomId || !_socket) return ;
    _socket.on(PreRoomEvent.CreatePreRoom, function listener({ room }: Record<string, PreRoom>) {
      handleCreatePreRoom(room);
    });
  });

  /**
   * 加入一个房间
   * 建立：加入前
   * 销毁：加入后
   */
  const handleJoinPreRoom = (room: PreRoom) => {
    preRoomId[1](room.roomId);
    preRoom[1](room);
    stage[1](1);
  };
  createEffect(() => {
    const roomId = preRoomId[0](), _socket = socket();
    if (roomId || !_socket) return ;
    _socket.on(PreRoomEvent.JoinPreRoom, function listener({ room }: Record<string, PreRoom>) {
      handleJoinPreRoom(room);
      _socket.removeListener(PreRoomEvent.JoinPreRoom, listener);
    });
  });

  /**
   * 房间解散
   * 建立：创建/加入(有房间 id)
   * 销毁：解散
   */
  const handleDisband = () => {
    preRoomId[1]('');
    preRoom[1](INITIAL_PRE_ROOM);
    stage[1](0);
  };
  createEffect(() => {
    const roomId = preRoomId[0](), _socket = socket();
    if (!roomId || !_socket) return ;
    const wrap = makeRoomWrapper(roomId);
    _socket.on(wrap(PreRoomEvent.DisbandPreRoom), function listener () {
      handleDisband();
      _socket.removeListener(wrap(PreRoomEvent.DisbandPreRoom), listener);
    });
  });

  /**
   * 房间同步
   * 建立：创建/加入
   * 销毁：解散/离开
   */
  const handleSync = (pr: PreRoom) => {
    preRoom[1](pr);
  };
  createEffect(() => {
    const roomId = preRoomId[0](), _socket = socket();
    if (!roomId || !_socket) return ;
    const wrap = makeRoomWrapper(roomId);
    _socket.on(wrap(PreRoomEvent.SyncPreRoom), handleSync);
    const listener = () => {
      _socket.removeListener(wrap(PreRoomEvent.SyncPreRoom), handleSync);
      _socket.removeListener(wrap(PreRoomEvent.LeavePreRoom), listener);
      _socket.removeListener(wrap(PreRoomEvent.DisbandPreRoom), listener);
    };
    _socket.on(wrap(PreRoomEvent.LeavePreRoom), listener);
    _socket.on(wrap(PreRoomEvent.DisbandPreRoom), listener);
  });


  /**
   * 游戏开始
   * 建立：创建/加入
   * 销毁：解散/离开/游戏开始
   */
  const handleStartGame = () => {
    stage[1](2);
  };
  createEffect(() => {
    const roomId = preRoomId[0](), _socket = socket();
    if (!roomId || !_socket) return ;

    const wrap = makeRoomWrapper(roomId);
    _socket.on(wrap(PreRoomEvent.StartGame), handleStartGame);
    const listener = () => {
      _socket.removeListener(wrap(PreRoomEvent.StartGame), handleStartGame);
      _socket.removeListener(wrap(PreRoomEvent.DisbandPreRoom), listener);
      _socket.removeListener(wrap(PreRoomEvent.LeavePreRoom), listener);
    };
    _socket.on(wrap(PreRoomEvent.LeavePreRoom), listener);
    _socket.on(wrap(PreRoomEvent.DisbandPreRoom), listener);
  });
};