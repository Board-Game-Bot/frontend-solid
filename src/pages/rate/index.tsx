import { createEffect, on, Show } from 'solid-js';
import { ColumnType } from './types';
import { GetRatesReq } from './requests';
import { Column, Layout, RadioGroup, Table } from '@/components';
import { signal, useRequest } from '@/utils';
import { GAMES } from '@/constants';

const RatePage = () => {
  const columns: Column<ColumnType>[] = [
    { title: '排名', render: (_, i) => i + 1 },
    { title: '用户', index: 'userId' },
    { title: '使用代码', index: 'botId' },
    { title: '分数', index: 'score' },
  ];

  const game = signal('snake');

  const getRatesReq = useRequest(
    GetRatesReq,
    {
      auto: true,
      params: [{
        gameId: game(),
        pageIndex: 0,
        pageSize: 10,
      }],
    },
  );

  createEffect(on(
    game,
    (v) => getRatesReq.run({
      gameId: v,
      pageIndex: 0,
      pageSize: 10,
    }),
  ));

  return (
    <Layout>
      <div class={'flex justify-center py8'}>
        <RadioGroup
          items={GAMES}
          defaultValue={'snake'}
          onChange={game}
        />
      </div>
      <Table
        columns={columns}
        data={getRatesReq.data()?.rates ?? []}
      />
    </Layout>
  );
};

export default RatePage;