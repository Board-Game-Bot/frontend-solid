import { DeleteTapeReq } from './requests';
import { Button, ButtonProps } from '@/components';
import { useRequest } from '@/utils';
import { Modal } from '@/components/Modal';
import { signal } from '@/utils/signal';

interface Props extends ButtonProps {
  id: string;
}

export const DeleteButton = (props: Props) => {
  const deleteTapeReq = useRequest(DeleteTapeReq, {
    onSuccess: () => {
      visible(false);
    },
  });

  const visible = signal(false);
  const handleOk = () => {
    deleteTapeReq.run({
      tapeId: props.id,
    });
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
