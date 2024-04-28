import { IconButton, Modal } from '@soku-solid/ui';
import { createSignal } from 'solid-js';
import { useRequest } from '@/utils';
import { client } from '@/api';

interface Props {
  id: string;
  onOk?: () => void;
}

export const DeleteButton = (props: Props) => {
  const visible = createSignal(false);
  const deleteBotReq = useRequest(
    client.DeleteBot,
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
        onOk={() => deleteBotReq.run({ Id: props.id })}
        onCancel={() => visible[1](false)}
      >
       删除后，记录无法找回，请谨慎操作。
      </Modal>
    </>
  );
};