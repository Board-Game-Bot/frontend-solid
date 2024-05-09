import { Select, SelectProps } from '@soku-solid/ui';
import { useRequest } from '@/utils';
import { client } from '@/api';
import { BotStatus } from '@/api/entity';
import { user } from '@/store';

interface Props extends SelectProps {
  gameId: string;
}

export const BotSelect = (props: Props) => {
  const [userSignal] = user;
  const listBotsReq = useRequest(() => client.ListBots({
    Filter: {
      UserIds: [userSignal()?.Id ?? ''],
      GameIds: [props.gameId],
      Statuses: [BotStatus.Working],
    },
  }), { auto: true });

  const options = () => {
    const bots = listBotsReq.data()?.Items ?? [];
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