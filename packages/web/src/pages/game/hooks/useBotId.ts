import { createLocalStorageSignal } from '@/utils';

const KEY = '__bot_id';

export const useBotId = () => {
  const [botId, setBotId] = createLocalStorageSignal(KEY, '');

  const post = (botId: string) => {
    setBotId(botId);
  };

  const get = () => {
    const oldBotId = botId();
    setBotId('');
    return oldBotId;
  };

  return { post, get };
};