import { JSX, For, createSignal } from 'solid-js';
import { NavItem } from './types';

interface Props {
  default?: string;
  title?: string;
  extra?: JSX.Element;
  items?: NavItem[];
  onItemClick?: (id: string) => void;
}

export const NavBar = (props: Props) => {
  const [current, setCurrent] = createSignal(props.default);

  function handleClick(id: string) {
    setCurrent(id);
    props.onItemClick?.(id);
  }

  return (
    <div class={'w-full h-70px center shadow-xl'}>
      <div class={'w-1000px h-full relative'}>
        <div class={'h-full text-2xl absolute top-0 left-0 center'}>
          <div class={'px3'}> {props.title ?? 'NavBar'} </div>
          <div class={'flex text-lg h-full'}>
            {<For each={props.items}>{({ id, title }) =>
              <div
                class={[
                  current() === id ? 'font-bold underline' : '',
                  'h-full px-4 center cursor-pointer hover:underline',
                ].join(' ')}
                onClick={()=>handleClick(id)}
              >
                {title}
              </div>
            }</For>}
          </div>
        </div>
        <div class={'h-full absolute top-0 right-0 center'}>{props.extra}</div>
      </div>
    </div>
  );
};

