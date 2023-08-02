import { createEffect, createSignal, For } from 'solid-js';

interface Props {
  onChangePage: (index: number, size: number) => void;
  size: number;
  total: number;
}

export default function Pagination(props: Props) {
  const [curPage, setCurPage] = createSignal(0);

  function handleClickPage(index: number) {
    setCurPage(index);
  }

  createEffect(() => {
    props.onChangePage && props.onChangePage(curPage(), props.size);
  });

  const pageCount = () => (props.total / props.size) | 0;

  return (
    <div class="mt-2 flex">
      <For
        each={Array(pageCount())
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
  );
}
