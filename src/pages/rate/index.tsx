import { createEffect, on, Show } from 'solid-js';
import { ColumnType } from './types';
import { Column, Layout, RadioGroup, Table } from '@/components';
import { signal, useRequest } from '@/utils';
import { GetRatesReq } from '@/pages/rate/requests';
import { GAMES } from '@/constants';

const RatePage = () => {
  const column: Column<ColumnType>[] = [
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
      <Show
        when={!getRatesReq.loading()}
        fallback={<h1>获取数据中...</h1>}
      >
        <Table
          title={'天梯排名'}
          columns={column}
          data={getRatesReq.data()?.rates ?? []}
        />
      </Show>
    </Layout>
  );
};

export default RatePage;