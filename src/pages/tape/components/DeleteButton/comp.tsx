import { DeleteTapeReq } from './requests';
import { Button, ButtonProps, Modal } from '@/components';
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
      <Button
        variant={'danger'}
        onClick={() => visible(true)}
      >
        删除
      </Button>
      <Modal
        title={'确认删除？'}
        visible={visible()}
        onOk={handleOk}
        loading={deleteTapeReq.loading()}
        onCancel={() => visible(false)}
      >
        <h1>请三思而后行</h1>
      </Modal>
    </>
  );
};
