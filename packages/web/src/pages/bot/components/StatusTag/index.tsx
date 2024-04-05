import { Show } from 'solid-js';
import { Drawer, Message } from '@soku-solid/ui';
import { useSignal } from '@soku-solid/utils';
import { STATUS_ICON_MAP } from './constants';
import { BotStatus } from '@/types';

interface Props {
    status: BotStatus;
    message?: string;
}
export const StatusTag = (props: Props) => {
  const obj = () => STATUS_ICON_MAP[props.status];

  const visible = useSignal(false);

  return (
    <>
      <div class={'flex items-center gap-1'} style={{ color: obj()?.color }}>
        <div class={'text-xl'}>
          {obj()?.El()}
        </div>
        {obj()?.text}
        <Show when={props.status === BotStatus.Failed}>
          <div class="i-mdi:eye-settings-outline w-1em h-1em cursor-pointer" onClick={() => visible.s(true)} />
        </Show>
      </div>
      <Drawer
        width={'600px'}
        visible={visible.v()}
        onOk={() => visible.s(false)}
        onCancel={() => visible.s(false)}
      >
        <div class={'p5'}>
          <Message width={'100%'} title={'编译错误'}>
            <pre>
              {props.message}
            </pre>
          </Message>
        </div>
      </Drawer>
    </>
  );
};