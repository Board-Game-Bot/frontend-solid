import { ParentProps } from 'solid-js';

import style from './index.module.scss';

interface Props extends ParentProps {
    width?: string;
    title?: string;
}

export const Message = (props: Props) => {
  return (
    <div class={style.message} style={{ width: props.width ?? '100%' }}>
      <div class={style.title}>
        <div class="i-mdi:warning w-1em h-1em" />
        <div>
          {props.title}
        </div>
      </div>
      {props.children}
    </div>
  );
};