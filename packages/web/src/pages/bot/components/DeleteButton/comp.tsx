import { IconButton, Modal } from '@soku-solid/ui';
import { useSignal } from '@soku-solid/utils';
import { DeleteBotReq } from './requests';
import { useRequest, signal } from '@/utils';

interface Props {
  id: string;
  onOk?: () => void;
}

export const DeleteButton = (props: Props) => {
  const visible = useSignal(false);
  const deleteBotReq = useRequest(
    DeleteBotReq,
    {
      onSuccess: () => {
        visible.s(false);
        props.onOk?.();
      },
    },
  );

  return (
    <>
      <IconButton icon={<div class="i-mdi:delete w-1em h-1em" />} onClick={() => visible.s(true)} />
      <Modal
        title={`确认删除${props.id}?`}
        visible={visible.v()}
        loading={deleteBotReq.loading()}
        onOk={() => deleteBotReq.run(props.id)}
        onCancel={() => visible.s(false)}
      >
       删除后，记录无法找回，请谨慎操作。
      </Modal>
    </>
  );
};