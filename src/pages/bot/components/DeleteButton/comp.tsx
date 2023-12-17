import { DeleteBotReq } from './requests';
import { Button, Modal } from '@/components';
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
      <Button variant={'danger'} onClick={() => visible(true)}>删除</Button>
      <Modal
        title={`确认删除${props.id}?`}
        visible={visible()}
        loading={deleteBotReq.loading()}
        onOk={() => deleteBotReq.run(props.id)}
        onCancel={() => visible(false)}
      >
        <h1>请三思而后行</h1>
      </Modal>
    </>
  );
};