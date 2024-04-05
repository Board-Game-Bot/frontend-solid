import { createMemo, Index, JSX, Show, splitProps } from 'solid-js';
import { cx } from '@soku-solid/utils';
import { Empty } from '../index';
import { Column } from './types';
import { ColumnComponent } from './components';
import { DEFAULT_RENDER } from './constants';

interface Props<T> extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'title'> {
  columns: Column<T>[];
  data: T[];
  width?: string;
  title?: JSX.Element;
}

export function Table<T>(_props: Props<T>) {
  const [props2, props] = splitProps(_props, ['title']);

  const width = createMemo(() => {
    return props.columns.map(x => x.width ?? '100px').join(' + ');
  });

  const getStickyStyle = (column: Column<T>): JSX.CSSProperties => {
    if (column.sticky === 'left') {
      return {
        position: 'sticky',
        left: '0',
      };
    }
    else if (column.sticky === 'right') {
      return {
        position: 'sticky',
        right: '0',
      };
    }
    return {};
  };

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
          width: `calc(${width()})`,
          'border-collapse': 'collapse',
          position: 'relative',
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
            <Index each={props.columns}>
              {(column) =>
                <th
                  class={'text-left border-1 border-solid border-#ededed bg-#ededed px3 py3'}
                  style={{
                    width: column().width,
                    ...getStickyStyle(column()),
                  }}
                >
                  {column().title}
                </th>
              }
            </Index>
          </tr>
        </thead>
        <Show when={props.columns.length}>
          <tbody>
            <Index
              each={props.data}
              fallback={
                <tr>
                  <td colspan={props.columns.length} class={'w-full h300px bg-#f0f0f0'}>
                    <Empty />
                  </td>
                </tr>
              }
            >
              {(record, columnIndex) =>
                <tr>
                  <Index each={props.columns}>
                    {(column) =>
                      <td
                        style={{
                          width: column().width,
                          'text-align': column().align,
                          'background-color': 'white',
                          ...getStickyStyle(column()),
                        }}
                        class={'border-1 border-solid border-#ededed px3 py1'}
                      >
                        <ColumnComponent record={record()} index={column().index} deps={column().deps}>
                          {column().render?.(record(), columnIndex) ?? DEFAULT_RENDER(record(), column().index)}
                        </ColumnComponent>
                      </td>
                    }
                  </Index>
                </tr>
              }
            </Index>
          </tbody>
        </Show>
      </table>
    </div>
  );
}