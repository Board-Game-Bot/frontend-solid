import { createSignal, For, Show } from 'solid-js';
import { capitalize } from 'lodash-es';
import { Socket } from 'socket.io-client';
import { buildGame } from '@soku-games/core';

import { Button } from '@soku-solid/ui';
import { Room } from '@/pages/game/types';
import { AudienceCard } from '@/pages/game/room/components';
import { user as userStore } from '@/store';
import { NetworkControlRequest } from '@/pages/game/message';
import { NetworkSyncExtra } from '@/utils/plugins';
import { useSaveTape } from '@/utils';

interface Props {
    room?: Room;
    socket?: Socket;
}

export const StageTwo = (props: Props)=> {
  const players = () => props.room?.Players;
  const audience = () => props.room?.Audience;
  const [user] = userStore;

  const [tape, setTape] = createSignal<any>();
  const handleRef = (el: HTMLDivElement) => {
    setTimeout(() => {
      const gameId = props.room?.Game.Id ?? '';
      buildGame({
        name: gameId,
        plugins: [
          {
            name: `${gameId}-screen`,
            extra: {
              el,
              couldControl: players()?.map(p => p.User.Id === user()?.Id && !p.Bot?.Id),
              emit: (step: string) => {
                props.socket?.emit(NetworkControlRequest.Step, step);
              },
            },
          },
          {
            name: 'NetworkSync',
            extra: {
              Socket: props.socket,
            } as NetworkSyncExtra,
          },
          {
            name: 'the-recorder',
            extra: {
              tapeResolved: (tape: any) => setTape(tape),
            },
          },
        ],
      });
    });
  };

  const handleSave = useSaveTape(tape, props.room?.Game.Id ?? '');

  return (
    <div class={'flex gap-4 w-full h-full p10'}>
      <div class={'w-400px flex-0 flex flex-col gap-4'}>
        <div class={'text-3xl font-600 w-400px'}>
          {props.room?.Game.Icon} {capitalize(props.room?.Game.Id)}
        </div>
        <div class={'flex flex-col gap-2'}>
          <h1>Players</h1>
          {<For each={players()}>{player =>
            <AudienceCard audience={player} />
          }</For>}
        </div>
        <div class={'flex flex-col gap-2'}>
          <h1>Audience</h1>
          {<For each={audience()}>{audience => 
            <AudienceCard audience={audience} />
          }</For>}
        </div>
      </div>
      <div class={'flex-1 flex flex-col gap-2'}>
        <div ref={handleRef} class={'aspect-ratio-square w-full bg-gray flex justify-center items-center'} />
        <Show when={tape()}>
          <Button class={'w-full text-2xl'} onClick={handleSave}>Save tape</Button>
        </Show>
        <div class={'font-mono'}>
          {JSON.stringify(tape() ?? {}, null, 2)}
        </div>
      </div>
    </div>
  );
};
