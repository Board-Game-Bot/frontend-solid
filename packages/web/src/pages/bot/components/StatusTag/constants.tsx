import { TagStatus } from './types';
import { BotStatus } from '@/types';

export const STATUS_ICON_MAP: Record<BotStatus, TagStatus> = {
  [BotStatus.Hibernating]: {
    color: 'grey',
    El: () => <div class="i-mdi:access-point-off w-1em h-1em" />,
    text: '休眠中',
  },
  [BotStatus.Deploying]: {
    color: 'blue',
    El: () => <div class="i-mdi:clock-outline w-1em h-1em" />,
    text: '部署中',
  },
  [BotStatus.Working]: {
    color: 'green',
    El: () => <div class="i-mdi:access-point w-1em h-1em" />,
    text: '已启动',
  },
  [BotStatus.Terminating]: {
    color: 'blue',
    El: () => <div class="i-mdi:checkbox-indeterminate-variant w-1em h-1em" />,
    text: '关机中',
  },
  [BotStatus.Failed]: {
    color: 'red',
    El: () => <div class="i-mdi:error-outline w-1em h-1em" />,
    text: '有异常',
  },
};