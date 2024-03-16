import dayjs from 'dayjs';
import { Show } from 'solid-js';
import { GetBotsReq } from './requests';
import { CreateButton } from './components';
import { useColumns } from './hooks';
import { Layout, Table } from '@/components';
import { useRequest } from '@/utils';

const BotPage = () => {
  const getBotsReq = useRequest(
    (pageIndex: number, pageSize: number) => GetBotsReq(pageIndex, pageSize),
    {
      auto: true,
    },
  );

  const handleOk = () => {
    getBotsReq.run(0, 10);
  };

  const columns = useColumns({ onOk: handleOk });

  return (
    <Layout>
      <Show
        when={!getBotsReq.loading() && getBotsReq.data()?.bots.length}
        fallback={
          <div>
            <h1>你目前还没有任何代码。</h1>
            <CreateButton onOk={handleOk} />
          </div>
        }
      >
        <Table
          title={
            <div class={'flex items-center gap-4'}>
              你的代码
              <CreateButton onOk={handleOk} />
            </div>
          }
          columns={columns}
          data={getBotsReq.data()?.bots ?? []}
          width={1300}
        />
      </Show>
    </Layout>
  );
};

export default BotPage;