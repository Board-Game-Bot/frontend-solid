import { JSX, ParentProps, Show } from 'solid-js';
import { Portal } from 'solid-js/web';
import { Button } from '../Button';

import style from './index.module.scss';

interface Props extends ParentProps {
    width?: string;
    visible?: boolean;
    onOk?: () => MaybePromise<any>;
    onCancel?: () => MaybePromise<any>
    title?: JSX.Element;
    loading?: boolean;
}

export type { Props as DrawerProps };

export const Drawer = (props: Props) => {
  return (
    <Portal mount={document.body}>

      <Show when={props.visible}>
        <div class={style.drawerContainer} onClick={() => props.onCancel?.()}>
          <div class={style.drawer} style={{ width: props.width ?? '600px' }} onClick={e => e.stopPropagation()}>
            <div class={style.header}>
              <div class={style.title}>
                {props.title}
              </div>
              <div onClick={() => props.onCancel?.()} class={'i-mdi:close w-1em h-1em cursor-pointer'} />
            </div>
            <div class={style.content}>
              {props.children}
            </div>
            <div class={style.footer}>
              <div class={style.footerStart} />
              <div class={style.footerButtonGroup}>
                <Button onClick={props.onCancel}>取消</Button>
                <Button loading={props.loading} onClick={props.onOk}>确定</Button>
              </div>
            </div>
          </div>
        </div>
      </Show>
    </Portal>
  );
};