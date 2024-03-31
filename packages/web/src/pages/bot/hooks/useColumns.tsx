import dayjs from 'dayjs';
import { Column } from 'soku-ui';
import { CodeButton, DeleteButton, OperateButton, StatusTag, UpdateButton } from '../components';
import { Bot } from '@/types';
import { monoRender } from '@/utils';

interface Props {
  onOk?: () => void;
}

export const useColumns = ({ onOk }: Props) => {
  const columns: Column<Bot>[] = [
    { index: 'id', title: '代码 ID', render: monoRender('id') },
    { index: 'gameId', title: '游戏', render: monoRender('gameId') },
    { index: 'status', title: '状态', render: (bot) => <StatusTag status={bot.status} message={bot.statusMessage}/> },
    { index: 'name', title: '名字', render: monoRender('name') },
    { index: 'description', title: '描述', render: (record) => <div class={'p3 max-h-10 overflow-y-auto'}>{record.description}</div> },
    { width: .5, index: 'langId', title: '语言', render: monoRender('langId') },
    { title: '创建时间', render: (record) =>
      <div class={'flex items-center font-mono'}>
        {dayjs(record.createTime).format('YYYY-MM-DD HH:mm')}
      </div>,
    },
    { width: .5, title: '操作', index: 'status', render: (bot) =>
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