import { IconButton } from '@soku-solid/ui';
import { Show } from 'solid-js';
import { Bot, BotStatus } from '@/api/entity';
import { client } from '@/api';

interface Props {
    bot: Bot;
    onOperate?: () => MaybePromise<void>;
}

export const OperateButton = (props: Props) => {
  const botStatus = () => props.bot.Status;

  const handleStart = async () => {
    await client.StartBot({ Id: props.bot.Id });
    props.onOperate?.();
  };

  const handleStop = async () => {
    await client.StopBot({ Id: props.bot.Id });
    props.onOperate?.();
  };

  return (
    <>
      <Show when={[BotStatus.Hibernating, BotStatus.Failed].includes(botStatus())}>
        <IconButton onClick={handleStart} icon={<div class="i-mdi:play w-1em h-1em" />} />
      </Show>
      <Show when={botStatus() === BotStatus.Working}>
        <IconButton onClick={handleStop} icon={<div class="i-mdi:stop w-1em h-1em" />}/>
      </Show>
    </>
  );
};