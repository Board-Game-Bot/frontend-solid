import { createSignal } from 'solid-js';
import { Button } from '@soku-solid/ui';
import { BotSelect } from '@/business/components';

interface Props {
    gameId?: string;
    onJoin: (botId: string) => void;
}

export const JoinCard = (props: Props) => {
  const [botId, setBotId] = createSignal('');

  return (
    <div class={'h-full w-300px flex flex-col gap-3 items-center rounded-md border-#ccc border-solid border-1 p-20px text-24px'}>
      <div class={'rounded-full w-150px h-150px flex justify-center items-center border-dashed border-2 border-#ccc'}>
        <div class={'i-mdi-plus text-3xl'} />
      </div>
      <div>With Bot</div>
      <BotSelect class={'w-full text-2xl'} gameId={props.gameId ?? ''} value={botId()} onChange={setBotId} />
      <Button class={'w-full text-2xl bg-blue text-white'} onClick={() => props.onJoin(botId())}>🤩 Join The Play!</Button>
    </div>
  );
};