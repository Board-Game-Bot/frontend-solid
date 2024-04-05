import { capitalize } from 'lodash-es';
import { createSignal, Show } from 'solid-js';
import { Column, CopiableText, Layout, RadioGroup, Table } from '@soku-solid/ui';
import { DeleteButton, LocalDeleteButton, LocalWatchButton, UploadButton, WatchButton } from './components';
import { GetTapesReq } from './requests';
import { formatTime, useLocalTapes, useRequest } from '@/utils';
import { Tape } from '@/types';
import { GameName } from '@/business/components';

const TapePage = () => {
  const commonColumns: Column<Tape>[] =
    [{
      index: 'gameId',
      title: '游戏',
      width: '120px',
      render: (tape) => <GameName name={tape.gameId} />,
    }, {
      index: 'uploadTime',
      title: '上传时间',
      width: '240px',
      render: (record) =>
        <div class={'font-mono'}>{formatTime(record.uploadTime)}</div>,
    }];

  const cloudColumns: Column<Tape>[] = [{
    index: 'id',
    title: 'ID',
    width: '260px',
    render: (tape) => <CopiableText class={'font-mono'} text={tape.id} />,
  }, ...commonColumns, {
    title: '操作',
    width: '120px',
    render: (record) => {
      return <div class={'flex gap-2'}>
        <DeleteButton onOk={() => getTapesReq.run()} id={record.id} />
        <WatchButton tape={record} />
      </div>;
    }
    ,
  }];

  const localColumns: Column<Tape>[] = [...commonColumns, {
    title: '操作',
    width: '120px',
    render: (record) =>
      <div class={'flex gap-2'}>
        <LocalDeleteButton tape={record} />
        <LocalWatchButton tape={record} />
        <UploadButton record={record} onOk={() => getTapesReq.run()} />
      </div>
    ,
  }];

  const tapes = useLocalTapes();

  const getTapesReq = useRequest(GetTapesReq, { auto: true });
  const onlineTapes = () => getTapesReq.data()?.tapes ?? [];

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
          data={tapes.v() ?? []}
        />
      </Show>
    </Layout>
  );
};

export default TapePage;