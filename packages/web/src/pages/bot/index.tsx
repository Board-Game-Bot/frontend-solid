import { Layout, Table } from '@soku-solid/ui';
import { onCleanup, onMount } from 'solid-js';
import { GetBotsReq } from './requests';
import { CreateButton } from './components';
import { useColumns } from './hooks';
import { useRequest } from '@/utils';

const BotPage = () => {
  const getBotsReq = useRequest(
    (pageIndex: number, pageSize: number) => GetBotsReq(pageIndex, pageSize),
    {
      auto: true,
      params: [0, 100],
    },
  );

  let timer: number;
  onMount(() => {
    timer = window.setInterval(() => getBotsReq.run(0, 100), 10000);
  });
  onCleanup(() => clearInterval(timer));


  const handleOk = () => {
    getBotsReq.run(0, 100);
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
        data={getBotsReq.data()?.bots ?? []}
      />
    </Layout>
  );
};

export default BotPage;