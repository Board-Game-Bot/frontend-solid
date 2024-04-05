
import { onMount } from 'solid-js';
import { Select, SelectProps } from '@soku-solid/ui';
import { BotGameReq } from './requests';
import { useRequest } from '@/utils';
import { BotStatus } from '@/types';

interface Props extends SelectProps {
  gameId: string;
}

export const BotSelect = (props: Props) => {
  const gameBotReq = useRequest(BotGameReq);
  onMount(() => {
    gameBotReq.run(props.gameId);
  });

  const options = () => {
    const bots = gameBotReq.data()?.bots;
    if (!bots) return { '': '亲自出马' };
    return bots.filter(bot => bot.status === BotStatus.Working).reduce((pre, cur) => {
      pre[cur.id] = cur.name;
      return pre;
    }, { '': '亲自出马' } as Record<string, string>);
  };

  return (
    <Select
      {...props}
      default={''}
      options={options()}
    />
  );
};