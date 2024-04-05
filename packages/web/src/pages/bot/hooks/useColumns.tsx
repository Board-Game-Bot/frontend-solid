import dayjs from 'dayjs';
import { Column, CopiableText } from 'soku-ui';
import { divide } from 'lodash-es';
import { CodeButton, DeleteButton, OperateButton, StatusTag, UpdateButton } from '../components';
import { Bot } from '@/types';
import { monoRender } from '@/utils';
import { GameName } from '@/business/components';
import { LANG_ICON_MAP } from '@/constants';

interface Props {
  onOk?: () => void;
}

export const useColumns = ({ onOk }: Props) => {
  const columns: Column<Bot>[] = [
    { sticky: 'left', index: 'id', title: '名称/ID', render: (bot) => {
      return (
        <div>
          <div class={'flex items-center gap-2'}>
            {bot.name}
          </div>
          <CopiableText text={bot.id} class={'font-mono text-12px text-gray'} />
        </div>
      );
    } },
    { width: '100px', index: 'gameId', title: '游戏', render: (bot) => {
      return (
        <GameName name={bot.gameId} />
      );
    } },
    { width: '100px', index: 'status', title: '状态', render: (bot) => <StatusTag status={bot.status} message={bot.statusMessage}/> },
    { width: '400px', index: 'description', title: '描述', render: (record) => <div class={'p3 max-h-7 overflow-y-auto'}>{record.description}</div> },
    { width: '50px', index: 'langId', title: '语言', render: (bot) => {
      return (
        <div class={'text-2xl flex items-center gap-2'}>
          {LANG_ICON_MAP[bot.langId]?.()}
        </div>
      );

    } },
    { width: '180px', title: '创建时间', render: (record) =>
      <div class={'flex items-center font-mono'}>
        {dayjs(record.createTime).format('YYYY-MM-DD HH:mm')}
      </div>,
    },
    { sticky: 'right', width: '120px', title: '操作', index: 'status', render: (bot) =>
      <div class={'flex gap-3'}>
        <OperateButton bot={bot} onOperate={onOk} />
        <CodeButton bot={bot} />
        <UpdateButton onOk={onOk} bot={bot} />
        <DeleteButton onOk={onOk} id={bot.id} />
      </div>,
    },
  ];

  return columns;
};