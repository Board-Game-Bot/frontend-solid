import { Button } from 'soku-ui';
import { useSignal } from 'soku-utils';
import { CreateBotDrawer } from './components';

interface Props {
  onOk?: () => void;
}

export const CreateButton = (props: Props) => {
  const visible = useSignal(false);

  const handleOk = async () => {
    visible.s(false);
    props.onOk?.();
  };

  return (
    <>
      <Button
        icon={<div class="i-mdi:plus-thick w-1em h-1em" />}
        onClick={() => visible.s(true)}
      >
        创建 Bot
      </Button>
      <CreateBotDrawer
        visible={visible.v()}
        onOk={handleOk}
        onCancel={() => visible.s(false)}
      />
    </>
  );
};