import { JSX, Show } from 'solid-js';
import { isNumber, isString } from 'lodash-es';
import { cx } from '@/utils';
import { Button } from '@/components';

interface Props {
  height?: number | string;
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
            'min-w-800px max-w-80vw max-h-80vh bg-white rounded-3 opacity-100 z-51 overflow-hidden',
            'box-border p5',
            'flex flex-col',
          )}
          style={{
            height: isString(props.height)
              ? props.height
              : isNumber(props.height)
                ? `${props.height}px`
                : undefined,
          }}
        >
          <div class={'h-40px w-full font-bold text-xl flex-0 flex justify-between'}>
            <div>
              {props.title ?? 'Modal Title'}
            </div>
            <div
              class={'text-gray cursor-pointer pb2'}
              onClick={props.onCancel}
            >
              X
            </div>
          </div>
          <div class={'max-h-60vh overflow-auto flex-1 py-10'}>{props.children}</div>
          <div class={'h-40px flex-0 flex justify-end gap-3 pr-3'}>
            <Button onClick={props.onCancel}>取消</Button>
            <Button loading={props.loading} onClick={props.onOk}>确定</Button>
          </div>
        </div>
      </div>
    </Show>
  );
};