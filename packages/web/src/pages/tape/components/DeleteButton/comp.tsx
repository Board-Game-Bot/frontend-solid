import { ButtonProps, IconButton, Modal } from '@soku-solid/ui';
import { createSignal } from 'solid-js';
import { DeleteTapeReq } from './requests';
import { useRequest } from '@/utils';

interface Props extends ButtonProps {
  id: string;
  onOk?: () => void;
}

export const DeleteButton = (props: Props) => {
  const visible = createSignal(false);

  const deleteTapeReq = useRequest(DeleteTapeReq, {
    onSuccess: () => {
      visible[1](false);
      props.onOk?.();
    },
  });

  const handleOk = () => {
    deleteTapeReq.run({ tapeId: props.id });
  };

  return (
    <>
      <IconButton icon={<div class="i-mdi:delete w-1em h-1em" />} variant={'danger'} onClick={() => visible[1](true)} />
      <Modal
        title={'确认删除？'}
        visible={visible[0]()}
        onOk={handleOk}
        loading={deleteTapeReq.loading()}
        onCancel={() => visible[1](false)}
      >
        删除后，记录无法找回，请谨慎操作。
      </Modal>
    </>
  );
};
