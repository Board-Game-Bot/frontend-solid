import dayjs from 'dayjs';
import { CodeButton, DeleteButton, UpdateButton } from '../components';
import { Button, Column } from '@/components';
import { Bot } from '@/types';
import { monoRender } from '@/utils';

interface Props {
  onOk?: () => void;
}

export const useColumns = ({ onOk }: Props) => {
  const columns: Column<Bot>[] = [
    { index: 'id', title: '代码 ID', render: monoRender('id') },
    { index: 'gameId', title: '游戏', render: monoRender('gameId') },
    { index: 'name', title: '名字', render: monoRender('name') },
    { index: 'description', title: '描述', render: (record) => <div class={'p3 max-h-10 overflow-y-auto'}>{record.description}</div> },
    { width: .5, index: 'langId', title: '语言', render: monoRender('langId') },
    { title: '创建时间', render: (record) =>
      <div class={'flex items-center font-mono'}>
        {dayjs(record.createTime).format('YYYY-MM-DD HH:mm')}
      </div>,
    },
    { width: 2.5, title: '操作', render: (record) =>
      <div class={'flex gap-3'}>
        <Button>设为公开/私密</Button>
        <CodeButton id={record.id} />
        <UpdateButton onOk={onOk} record={record} />
        <DeleteButton onOk={onOk} id={record.id} />
      </div>,
    },
  ];

  return columns;
};