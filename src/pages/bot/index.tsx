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
      <h2 class={'flex gap4'}>
        代码集
        <CreateButton onOk={handleOk}/>
      </h2>
      <Table
        columns={columns}
        data={getBotsReq.data()?.bots ?? []}
        width={1300}
      />
    </Layout>
  );
};

export default BotPage;