import { Button, Modal } from '@soku-solid/ui';
import { useSignal } from '@soku-solid/utils';
import { DeleteBotReq } from './requests';
import { useRequest } from '@/utils';

interface Props {
  id: string;
}

// TODO
export const PublicButton = (props: Props) => {
  const publicBotReq = useRequest(
    DeleteBotReq,
    {
      onSuccess: () => {
        visible.s(false);
      },
    },
  );
  const visible = useSignal(false);

  return (
    <>
      <Button variant={'danger'} onClick={() => visible.s(true)}>删除</Button>
      <Modal
        title={`确认删除${props.id}?`}
        visible={visible.s()}
        loading={publicBotReq.loading()}
        onOk={() => publicBotReq.run(props.id)}
        onCancel={() => visible.s(false)}
      >
        <h1>请三思而后行</h1>
      </Modal>
    </>
  );
};