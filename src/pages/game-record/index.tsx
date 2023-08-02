import { ContentBox, Pagination, Table } from '@/components/common';
import { createSignal, For, onMount } from 'solid-js';
import { useRequest } from '@/utils/util';
import { gameGetAllApi } from '@/api/game';
import { recordGetApi } from '@/api/record';
import { User } from '@/store/user';

const columns = [
  { key: 'id', title: '标识' },
  { key: 'time', title: '时间' },
  { key: 'result', title: '结果' },
  { key: 'users', title: '参赛人员' },
  { key: 'operate', title: '操作' },
];

export default function GameRecordView() {
  const [data, , isLoading, run] = useRequest(gameGetAllApi);

  onMount(() => {
    run();
  });

  const [, , isLoadingGetRecord, runGetRecord] = useRequest(recordGetApi);

  const games = () => data()?.games;
  const [focus, setFocus] = createSignal('');

  function handleClick(id: string) {
    if (focus() === id) {
      setFocus('');
    } else {
      setFocus(id);
    }
  }

  const [records, setRecords] = createSignal<
    {
      id: string;
      time: string;
      result: string;
      users: User[];
    }[]
  >([]);

  async function handleChangePage(index: number, size: number) {
    const [data, err] = await runGetRecord(focus(), index, size);
    if (!err && data) {
      setRecords(data.records);
    }
  }

  function handleWatchRecord(id: string) {
    alert(`你正在尝试观看录像：${id}`);
  }

  const preparedRecords = () =>
    isLoadingGetRecord()
      ? []
      : records().map((record) => ({
          ...record,
          id: <span class="font-mono">{record.id.slice(0, 8)}...</span>,
          users: (
            <div>
              <For each={record.users}>
                {(user) => (
                  <div class="flex items-center">
                    <img
                      class="w-20px h-20px rounded-full my-1"
                      src={user.avatar}
                      alt="user_avatar"
                    />
                    <span>{user.name}</span>
                  </div>
                )}
              </For>
            </div>
          ),
          operate: (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleWatchRecord(record.id);
              }}
            >
              播放
            </button>
          ),
        }));

  return (
    <ContentBox>
      <h1>Game Record View</h1>
      {isLoading() && <h1 class="text-7xl font-thin">获取中...</h1>}
      {!isLoading() && games() && (
        <For each={games()}>
          {(game) => (
            <div
              onClick={() => handleClick(game.id)}
              class="bg-#fefefe px-5 py-4 my-4 rounded-lg shadow-2xl cursor-pointer transition hover:scale-110"
            >
              <div class="flex items-center gap-4">
                <span class="text-5xl">{game.icon}</span>
                <span class="text-3xl">{game.title}</span>
              </div>
              {focus() === game.id && (
                <Pagination
                  total={100}
                  size={10}
                  onChangePage={handleChangePage}
                />
              )}
              {focus() === game.id && isLoadingGetRecord() && (
                <h1 class="text-5xl font-thin">获取数据中...</h1>
              )}
              {focus() === game.id && !isLoadingGetRecord() && (
                <Table columns={columns} data={preparedRecords()} />
              )}
            </div>
          )}
        </For>
      )}
    </ContentBox>
  );
}
