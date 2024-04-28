
import { Select, SelectProps } from '@soku-solid/ui';
import { useRequest } from '@/utils';
import { BotStatus } from '@/types';
import { client } from '@/api';

interface Props extends SelectProps {
  gameId: string;
}

export const BotSelect = (props: Props) => {
  const gameBotReq = useRequest(() => client.ListBots({
    Filter: {
      GameIds: [props.gameId],
    },
  }));

  const options = () => {
    const bots = gameBotReq.data()?.Items ?? [];
    if (!bots) return { '': '亲自出马' };
    return bots.filter(bot => bot.Status === BotStatus.Working).reduce((pre, cur) => {
      pre[cur.Id] = cur.Name;
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