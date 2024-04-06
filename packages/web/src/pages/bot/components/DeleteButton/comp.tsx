import { IconButton, Modal } from '@soku-solid/ui';
import { createSignal } from 'solid-js';
import { DeleteBotReq } from './requests';
import { useRequest } from '@/utils';

interface Props {
  id: string;
  onOk?: () => void;
}

export const DeleteButton = (props: Props) => {
  const visible = createSignal(false);
  const deleteBotReq = useRequest(
    DeleteBotReq,
    {
      onSuccess: () => {
        visible[1](false);
        props.onOk?.();
      },
    },
  );

  return (
    <>
      <IconButton icon={<div class="i-mdi:delete w-1em h-1em" />} onClick={() => visible[1](true)} />
      <Modal
        title={`确认删除${props.id}?`}
        visible={visible[0]()}
        loading={deleteBotReq.loading()}
        onOk={() => deleteBotReq.run(props.id)}
        onCancel={() => visible[1](false)}
      >
       删除后，记录无法找回，请谨慎操作。
      </Modal>
    </>
  );
};