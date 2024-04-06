import { Button } from '@soku-solid/ui';
import { createSignal } from 'solid-js';
import { CreateBotDrawer } from './components';

interface Props {
  onOk?: () => void;
}

export const CreateButton = (props: Props) => {
  const visible = createSignal(false);

  const handleOk = async () => {
    visible[1](false);
    props.onOk?.();
  };

  return (
    <>
      <Button
        icon={<div class="i-mdi:plus-thick w-1em h-1em" />}
        onClick={() => visible[1](true)}
      >
        创建 Bot
      </Button>
      <CreateBotDrawer
        visible={visible[0]()}
        onOk={handleOk}
        onCancel={() => visible[1](false)}
      />
    </>
  );
};