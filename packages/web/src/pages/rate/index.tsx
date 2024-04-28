import { createEffect, createSignal, on } from 'solid-js';
import { Column, Layout, RadioGroup, Table } from '@soku-solid/ui';
import { useRequest } from '@/utils';
import { GAMES } from '@/constants';
import { client } from '@/api';
import { Rate } from '@/api/entity';

const RatePage = () => {
  const columns: Column<Rate>[] = [
    { index: 'Rank', width: '75px', title: '排名', render: (_, i) => {
      return i + 1;
    } },
    { width: '120px', title: '用户', index: 'UserId' },
    { width: '240px', title: '使用代码', index: 'BotId', render: (bot) => bot.BotId || '亲自出马' },
    { width: '75px', title: '分数', index: 'Score' },
  ];

  const game = createSignal('snake');

  const listRatesReq = useRequest(
    client.ListRates,
    {
      auto: true,
      params: [{
        Filter: {
          GameIds: [game[0]()!],
        },
      }],
    },
  );

  createEffect(on(
    game[0],
    (v) => listRatesReq.run({
      Filter: {
        GameIds: [v],
      },
    }),
  ));

  return (
    <Layout>
      <div class={'flex justify-center py8'}>
        <RadioGroup
          items={GAMES}
          defaultValue={'snake'}
          onChange={game[1]}
        />
      </div>
      <Table
        columns={columns}
        data={listRatesReq.data()?.Items ?? []}
      />
    </Layout>
  );
};

export default RatePage;