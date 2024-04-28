import { Layout, Table } from '@soku-solid/ui';
import { onCleanup, onMount } from 'solid-js';
import { CreateButton } from './components';
import { useColumns } from './hooks';
import { useRequest } from '@/utils';
import { client } from '@/api';

const BotPage = () => {
  const listBotsReq = useRequest(
    client.ListBots,
    {
      auto: true,
      params: [{}],
    },
  );

  let timer: number;
  onMount(() => {
    timer = window.setInterval(() => listBotsReq.run({}), 10000);
  });
  onCleanup(() => clearInterval(timer));


  const handleOk = () => {
    listBotsReq.run({});
  };

  const columns = useColumns({ onOk: handleOk });

  return (
    <Layout>
      <h2 class={'flex gap4'}>
        代码集
        <CreateButton onOk={handleOk}/>
      </h2>
      <Table
        columns={columns}
        data={listBotsReq.data()?.Items ?? []}
      />
    </Layout>
  );
};

export default BotPage;