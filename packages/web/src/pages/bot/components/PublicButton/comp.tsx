import { Button, Modal } from '@soku-solid/ui';
import { createSignal } from 'solid-js';
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
        visible[1](false);
      },
    },
  );
  const visible = createSignal(false);

  return (
    <>
      <Button variant={'danger'} onClick={() => visible[1](true)}>删除</Button>
      <Modal
        title={`确认删除${props.id}?`}
        visible={visible[0]()}
        loading={publicBotReq.loading()}
        onOk={() => publicBotReq.run(props.id)}
        onCancel={() => visible[1](false)}
      >
        <h1>请三思而后行</h1>
      </Modal>
    </>
  );
};