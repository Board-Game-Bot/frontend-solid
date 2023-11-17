import { JSX, For } from 'solid-js';
import { isString } from 'lodash';

interface Props {
  columns: {
    key: string;
    title: string;
  }[];
  data: {
    [key: string]: string | JSX.Element;
  }[];
}

export default function Table(props: Props) {
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
                    {isString(row[col.key]) && <span>{row[col.key]}</span>}
                    {!isString(row[col.key]) && row[col.key]}
                  </td>
                )}
              </For>
            </tr>
          )}
        </For>
      </tbody>
    </table>
  );
}
