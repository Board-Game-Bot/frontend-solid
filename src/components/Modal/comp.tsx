import { JSX, Show } from 'solid-js';
import { isNumber, isString } from 'lodash-es';
import { cx } from '@/utils';
import { Button } from '@/components';

interface Props {
  height?: number | string;
  width?: number | string;
  visible?: boolean;
  children?: JSX.Element;
  title?: string;
  onCancel?: () => void;
  onOk?: () => void;
  loading?: boolean;
}

export type { Props as ModalProps };

export const Modal = (props: Props) => {
  return (
    <Show when={props.visible}>
      <div class={'duration-200 w-screen h-screen fixed top-0 left-0 z-50 flex justify-center items-center'}>
        <div class={'absolute w-screen h-screen top-0 left-0 bg-black opacity-50'} />
        <div
          class={cx(
            'min-w-300px max-w-80vw max-h-80vh bg-white rounded-3 opacity-100 z-51 overflow-hidden',
            'box-border',
            'flex flex-col',
          )}
          style={{
            height: isString(props.height)
              ? props.height
              : isNumber(props.height)
                ? `${props.height}px`
                : undefined,
            width: isString(props.width)
              ? props.width
              : isNumber(props.width)
                ? props.width + 'px'
                : undefined,
          }}
        >
          <div class={'w-full font-500 text-xl flex-0 flex justify-between px5 pt3 box-border border-b-#eee border-b-solid border-b-1'}>
            <div>
              {props.title ?? 'Modal Title'}
            </div>
            <div
              class={'text-gray text-4xl cursor-pointer relative -top-2'}
              onClick={props.onCancel}
            >
              ×
            </div>
          </div>
          <div class={'min-w-200px min-h-100px overflow-auto flex-1 px5 py3'}>{props.children ?? 'Content'}</div>
          <div />
          <div class={'flex-0 flex justify-end items-end gap-3 box-border p3 border-t-1 border-t-#eee border-t-solid'}>
            <Button onClick={props.onCancel}>取消</Button>
            <Button loading={props.loading} onClick={props.onOk}>确定</Button>
          </div>
        </div>
      </div>
    </Show>
  );
};