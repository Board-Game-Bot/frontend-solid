import { createEffect, on } from 'solid-js';
import { Column, Layout, RadioGroup, Table } from '@soku-solid/ui';
import { useSignal } from '@soku-solid/utils';
import { ColumnType } from './types';
import { GetRatesReq } from './requests';
import { useRequest } from '@/utils';
import { GAMES } from '@/constants';

const RatePage = () => {
  const columns: Column<ColumnType>[] = [
    { width: '75px', title: '排名', render: (_, i) => {
      return i + 1;
    } },
    { width: '120px', title: '用户', index: 'userId' },
    { width: '240px', title: '使用代码', index: 'botId', render: (bot) => bot.botId || '亲自出马' },
    { width: '75px', title: '分数', index: 'score' },
  ];

  const game = useSignal('snake');

  const getRatesReq = useRequest(
    GetRatesReq,
    {
      auto: true,
      params: [{
        gameId: game.v()!,
        pageIndex: 0,
        pageSize: 10,
      }],
    },
  );

  createEffect(on(
    game.v,
    (v) => getRatesReq.run({
      gameId: v!,
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
          onChange={game.s}
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