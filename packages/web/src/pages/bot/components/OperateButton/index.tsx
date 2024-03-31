import { IconButton } from 'soku-ui';
import { Show } from 'solid-js';
import { CompileBotReq, StopBotReq } from './requests';
import { Bot, BotStatus } from '@/types';

interface Props {
    bot: Bot;
    onOperate?: () => MaybePromise<void>;
}

export const OperateButton = (props: Props) => {
  const botStatus = () => props.bot.status;

  const handleStart = async () => {
    await CompileBotReq(props.bot.id);
    props.onOperate?.();
  };

  const handleStop = async () => {
    await StopBotReq(props.bot.id);
    props.onOperate?.();
  };

  return (
    <>
      <Show when={[BotStatus.Hibernating, BotStatus.Failed].includes(botStatus())}>
        <IconButton onClick={handleStart} icon={<div class="i-mdi:play w-2em h-2em" />} />
      </Show>
      <Show when={botStatus() === BotStatus.Working}>
        <IconButton onClick={handleStop} icon={<div class="i-mdi:stop w-2em h-2em" />}/>
      </Show>
    </>
  );
};