import { JSX, For, createSignal, createEffect } from 'solid-js';
import { isString } from 'lodash';

interface Props {
  columns: {
    key: string;
    title: string;
  }[];
  data: {
    [key: string]: string | JSX.Element;
  }[];
  pagination?: Pagination;
  onChangePage?: (index: number, size: number) => void;
}

interface Pagination {
  open: boolean;
  size?: number;
}

export default function Table(props: Props) {
  const [curPage, setCurPage] = createSignal(0);

  function handleClickPage(page: number) {
    setCurPage(page);
  }

  createEffect(() => {
    // 换页
    props.onChangePage &&
      props.onChangePage(curPage(), props.pagination?.size || 10);
  });

  return (
    <table class="w-full">
      <thead>
        <tr>
          <For each={props.columns}>
            {(col) => <td class="font-bold py-2 px-2">{col.title}</td>}
          </For>
        </tr>
      </thead>
      <tbody class="bg-white">
        <For each={props.data}>
          {(row) => (
            <tr>
              <For each={props.columns}>
                {(col) => (
                  <td class="px-2 py-1">
                    {isString(row[col.key]) && (
                      <span>{row[col.key] as string}</span>
                    )}
                    {!isString(row[col.key]) && (row[col.key] as JSX.Element)}
                  </td>
                )}
              </For>
            </tr>
          )}
        </For>
      </tbody>
      {props.pagination && (
        <div class="mt-2 flex">
          <For
            each={Array(5)
              .fill(0)
              .map((_, i) => i)}
          >
            {(item) => (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleClickPage(item);
                }}
                class={[
                  'center w-25px h-25px rounded-md cursor-pointer overflow-hidden hover:hover_black',
                  curPage() === item ? 'hover_black' : '',
                ].join(' ')}
              >
                {item}
              </div>
            )}
          </For>
        </div>
      )}
    </table>
  );
}
