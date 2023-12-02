import { capitalize } from 'lodash-es';
import { Show } from 'solid-js';
import { DeleteButton, LocalDeleteButton, LocalWatchButton, UploadButton, WatchButton } from './components';
import { GetTapesReq } from './requests';
import { Column, Layout, Table } from '@/components';
import { useLocalTapes, useRequest } from '@/utils';
import { Tape } from '@/types';

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
        <DeleteButton onOk={() => getTapesReq.run()} id={record.id} />
        <WatchButton tape={record} />
      </div>
    ,
  }];

  const columns2: Column<Tape>[] = [...commonColumns, {
    title: '操作',
    width: 1,
    render: (record) =>
      <div class={'flex gap-2'}>
        <LocalDeleteButton tape={record} />
        <LocalWatchButton tape={record} />
        <UploadButton record={record} onOk={() => getTapesReq.run()} />
      </div>
    ,
  }];

  const [tapes, setTapes] = useLocalTapes();

  const getTapesReq = useRequest(GetTapesReq, { auto: true });

  return (
    <Layout>
      <Show
        when={getTapesReq.data()?.tapes.length}
        fallback={
          <h2>你没有云端上的录像</h2>
        }
      >
        <Table
          class={'w-full'}
          title={'你的录像带'}
          columns={columns}
          data={getTapesReq.data()?.tapes ?? []}
        />
      </Show>
      <Show
        when={tapes().length}
        fallback={
          <h2>你没有留存本地的录像</h2>
        }
      >
        <Table
          class={'w-full'}
          title={'留存本地的录像带'}
          columns={columns2}
          data={tapes()}
        />
      </Show>
    </Layout>
  );
};

export default TapePage;