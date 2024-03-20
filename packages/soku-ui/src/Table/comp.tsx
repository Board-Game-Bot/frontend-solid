import { For, JSX, Show, splitProps } from 'solid-js';
import { isUndefined } from 'lodash-es';
import { cx } from 'soku-utils';
import { Empty } from '../index';
import { Column } from './types';

interface Props<T> extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'title'> {
  columns: Column<T>[];
  data: T[];
  width?: number;
  title?: JSX.Element;
}

export function Table<T>(_props: Props<T>) {
  const [props2, props] = splitProps(_props, ['title']);
  const { columns } = props;
  const sum = columns.reduce((sum, cur) => sum + (cur.width ?? 1), 0);
  const average = 100 / sum;

  const cellWidth = (width?: number) => `${isUndefined(width) ? average : width * 100 / sum}%`;

  return (
    <div
      {...props}
      class={cx(
        props.class,
        'overflow-y-auto',
      )}
    >
      <table
        style={{
          width: isUndefined(props.width)
            ? '100%'
            : `${props.width}px`,
          'border-collapse': 'collapse',
        }}
      >
        <thead>
          <Show when={props2.title}>
            <tr>
              <th
                colspan={props.columns.length}
                class={'text-xl py-2 rounded-t-2 border-solid border-1px border-#eeeeee bg-#dedede font-500'}
              >
                {props2.title}
              </th>
            </tr>
          </Show>
          <tr>
            <For each={props.columns}>
              {(column) =>
                <th
                  style={{ width: cellWidth(column.width) }}
                  class={'text-left border-1 border-solid border-#ededed bg-#ededed px3 py3'}
                >
                  {column.title}
                </th>
              }
            </For>
          </tr>
        </thead>
        <Show when={props.columns.length}>
          <tbody>
            <For
              each={props.data}
              fallback={
                <tr>
                  <td colspan={props.columns.length} class={'w-full h300px bg-#f0f0f0'}>
                    <Empty />
                  </td>
                </tr>
              }
            >
              {(record) =>
                <tr>
                  <For each={props.columns}>
                    {(column, index) =>
                      <td
                        style={{
                          width: cellWidth(column.width),
                          'text-align': column.align,
                        }}
                        class={'border-1 border-solid border-#ededed px3 py1'}
                      >
                        {column.render?.(record, index()) ?? (column.index && (record as any)[column.index])}
                      </td>
                    }
                  </For>
                </tr>
              }
            </For>
          </tbody>
        </Show>
      </table>
    </div>
  );
}