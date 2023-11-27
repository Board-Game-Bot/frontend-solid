import dayjs from 'dayjs';
import { GetBotsReq } from './requests';
import { DeleteButton, UpdateButton, CodeButton, CreateButton } from './components';
import { Button, Column, Layout, Table } from '@/components';
import { Bot } from '@/types';
import { monoRender, useRequest } from '@/utils';

const BotPage = () => {
  const column: Column<Bot>[] = [
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
        <UpdateButton record={record} />
        <DeleteButton id={record.id} />
      </div>,
    },
  ];

  const getBotsReq = useRequest(
    (pageIndex: number, pageSize: number) => GetBotsReq(pageIndex, pageSize),
    {
      auto: true,
    },
  );

  return (
    <Layout>
      <Table
        title={
          <div class={'flex items-center gap-4'}>
            你的代码
            <CreateButton />
          </div>
        }
        columns={column}
        data={getBotsReq.data()?.bots ?? []}
        width={1300}
      />
    </Layout>
  );
};

export default BotPage;