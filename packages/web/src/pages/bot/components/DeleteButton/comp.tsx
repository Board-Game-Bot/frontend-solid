import { IconButton, Modal } from 'soku-ui';
import { DeleteBotReq } from './requests';
import { useRequest, signal } from '@/utils';

interface Props {
  id: string;
  onOk?: () => void;
}

export const DeleteButton = (props: Props) => {
  const deleteBotReq = useRequest(
    DeleteBotReq,
    {
      onSuccess: () => {
        visible(false);
        props.onOk?.();
      },
    },
  );
  const visible = signal(false);

  return (
    <>
      <IconButton icon={<div class="i-mdi:delete w-2em h-2em" />} onClick={() => visible(true)} />
      <Modal
        title={`确认删除${props.id}?`}
        visible={visible()}
        loading={deleteBotReq.loading()}
        onOk={() => deleteBotReq.run(props.id)}
        onCancel={() => visible(false)}
      >
       删除后，记录无法找回，请谨慎操作。
      </Modal>
    </>
  );
};