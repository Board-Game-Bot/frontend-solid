import { createSignal, Show } from 'solid-js';
import { Column, Layout, RadioGroup, Table } from '@soku-solid/ui';
import { DeleteButton, LocalDeleteButton, LocalWatchButton, UploadButton, WatchButton } from './components';
import { formatTime, useLocalTapes, useRequest } from '@/utils';
import { GameName, NameAndId, OnlyICan } from '@/business/components';
import { Tape } from '@/api/entity';
import { client } from '@/api';

const TapePage = () => {
  const commonColumns: Column<Tape>[] =
    [{
      index: 'GameId',
      title: '游戏',
      width: 'fit-inherit',
      render: (tape) => <GameName name={tape.GameId} />,
    }, {
      index: 'CreateTime',
      title: '上传时间',
      width: '240px',
      render: (record) =>
        <div class={'font-mono'}>{formatTime(record.CreateTime)}</div>,
    }];

  const cloudColumns: Column<Tape>[] = [{
    index: 'Id',
    title: '名称/Id',
    width: '300px',
    render: (tape) => 
      <NameAndId id={tape.Id} name={tape.Name} />
    ,
  }, ...commonColumns, {
    index: 'Id',
    title: '操作',
    width: '120px',
    render: (record) => {
      return (
        <div class={'flex gap-2'}>
          <OnlyICan userId={record.UserId}>
            <DeleteButton onOk={() => listTapesReq.run({})} id={record.Id} />
          </OnlyICan>
          <WatchButton tape={record} />
        </div>
      );
    }
    ,
  }];

  const localColumns: Column<Tape>[] = [...commonColumns, {
    index: 'Id',
    title: '操作',
    width: '120px',
    render: (record) =>
      <div class={'flex gap-2'}>
        <LocalDeleteButton tape={record} />
        <LocalWatchButton tape={record} />
        <UploadButton record={record} onOk={() => listTapesReq.run({})} />
      </div>
    ,
  }];

  const tapes = useLocalTapes();

  const listTapesReq = useRequest(client.ListTapes, { auto: true });
  const onlineTapes = () => listTapesReq.data()?.Items ?? [];

  const RADIO_OPTIONS = {
    cloud: '云端',
    local: '本地',
  };

  const [currentTab, setCurrentTab] = createSignal<keyof typeof RADIO_OPTIONS>('cloud');

  return (
    <Layout>
      <div class={'flex gap-4 items-center'}>
        <h2>录像带</h2>
        <RadioGroup items={RADIO_OPTIONS} onChange={setCurrentTab}/>
      </div>
      <Show when={currentTab() === 'cloud'}>
        <Table
          class={'w-full'}
          columns={cloudColumns}
          data={onlineTapes()}
        />
      </Show>
      <Show when={currentTab() === 'local'}>
        <Table
          class={'w-full'}
          columns={localColumns}
          data={tapes[0]()}
        />
      </Show>
    </Layout>
  );
};

export default TapePage;