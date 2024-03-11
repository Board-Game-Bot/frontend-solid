import { BotGameReq } from './requests';
import { Select, SelectProps } from '@/components';
import { useRequest } from '@/utils';

interface Props extends SelectProps {
  gameId: string;
}

export const BotSelect = (props: Props) => {
  const gameBotReq = useRequest(
    BotGameReq,
    { auto: true, params: [props.gameId] },
  );

  const options = () => {
    const bots = gameBotReq.data()?.bots;
    if (!bots) return { '': '亲自出马' };
    return bots.reduce((pre, cur) => {
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