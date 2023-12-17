import { For, JSX, Show, splitProps } from 'solid-js';
import { isUndefined } from 'lodash-es';
import { Column } from './types';
import { cx } from '@/utils';

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
        }}
      >
        <thead>
          <Show when={props2.title}>
            <tr>
              <th colspan={props.columns.length}>
                <div class={'block text-center text-xl py-2'}>
                  {props2.title}
                </div>
              </th>
            </tr>
          </Show>
          <tr>
            <For each={props.columns}>
              {(column) =>
                <th style={{ width: `${isUndefined(column.width) ? average : column.width * 100 / sum}%` }} >
                  <div class={'block text-left'}>
                    {column.title}
                  </div>
                </th>
              }
            </For>
          </tr>
        </thead>
        <Show when={props.columns.length}>
          <tbody>
            <For each={props.data}>
              {(record) =>
                <tr>
                  <For each={props.columns}>
                    {(column, index) =>
                      <td
                        style={{
                          width: `${isUndefined(column.width) ? average : column.width * 100 / sum}%`,
                          'text-align': column.align,
                        }}
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