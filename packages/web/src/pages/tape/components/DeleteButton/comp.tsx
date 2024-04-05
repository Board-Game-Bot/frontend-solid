import { ButtonProps, IconButton, Modal } from '@soku-solid/ui';
import { DeleteTapeReq } from './requests';
import { useRequest, signal } from '@/utils';

interface Props extends ButtonProps {
  id: string;
  onOk?: () => void;
}

export const DeleteButton = (props: Props) => {
  const deleteTapeReq = useRequest(DeleteTapeReq, {
    onSuccess: () => {
      visible(false);
      props.onOk?.();
    },
  });

  const visible = signal(false);
  const handleOk = () => {
    deleteTapeReq.run({ tapeId: props.id });
  };

  return (
    <>
      <IconButton icon={<div class="i-mdi:delete w-1em h-1em" />} variant={'danger'} onClick={() => visible(true)} />
      <Modal
        title={'确认删除？'}
        visible={visible()}
        onOk={handleOk}
        loading={deleteTapeReq.loading()}
        onCancel={() => visible(false)}
      >
        删除后，记录无法找回，请谨慎操作。
      </Modal>
    </>
  );
};
