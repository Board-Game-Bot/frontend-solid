import { capitalize } from 'lodash-es';
import { createEffect } from 'solid-js';
import { DeleteButton, UploadButton, WatchButton } from './components';
import { GetTapesReq } from './requests';
import { Column, Layout, Table } from '@/components';
import { createLocalStorageSignal, useRequest } from '@/utils';
import { Tape } from '@/types';
import { signal } from '@/utils/signal';

const TapePage = () => {
  const commonColumns: Column<Tape>[] =
    [{
      index: 'gameId',
      title: '游戏',
      width: .5,
      render: (record) => <div class={'font-mono'}>{capitalize(record.gameId)}</div>,
    }, {
      index: 'uploadTime',
      title: '上传时间',
      width: 1,
      render: (record) =>
        <div class={'font-mono'}>{record.uploadTime}</div>,
    }];

  const columns: Column<Tape>[] = [{
    index: 'id',
    title: '录像 ID',
    width: 1.5,
    render: (record) => <div class={'font-mono'}>{record.id}</div>,
  }, ...commonColumns, {
    title: '操作',
    width: 1,
    render: (record) =>
      <div class={'flex gap-2'}>
        <DeleteButton id={record.id} />
        <WatchButton id={record.id} />
      </div>
    ,
  }];

  const columns2: Column<Tape>[] = [...commonColumns, {
    title: '操作',
    width: 1,
    render: (record) =>
      <div class={'flex gap-2'}>
        <DeleteButton id={record.id} />
        <WatchButton id={record.id} />
        <UploadButton record={record} />
      </div>
    ,
  }];

  const [rawLocalTapes, setRawLocalTapes] = createLocalStorageSignal('localTapes');
  
  const localTapes = signal<Tape[]>(
    (() => {
      try {
        return JSON.parse(rawLocalTapes());
      }
      catch {
        return [];
      }
    })(),
  );

  createEffect(() => setRawLocalTapes(JSON.stringify(localTapes())));

  const getTapesReq = useRequest(GetTapesReq, { auto: true });

  return (
    <Layout>
      <Table
        class={'w-full'}
        title={'你的录像带'}
        columns={columns}
        data={getTapesReq.data()?.tapes ?? []}
      />
      <Table
        class={'w-full'}
        title={'留存本地的录像带'}
        columns={columns2}
        data={localTapes()}
      />
    </Layout>
  );
};

export default TapePage;