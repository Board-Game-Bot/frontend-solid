import { IconButton, Modal } from '@soku-solid/ui';
import { signal, useLocalTapes } from '@/utils';
import { Tape } from '@/types';

interface Props {
  tape: Tape;
  onOk?: () => void;
}

export const LocalDeleteButton = (props: Props) => {
  const visible = signal(false);

  const tapes = useLocalTapes();
  const handleDelete = () => {
    tapes.s(tapes.v()?.filter(tape => JSON.stringify(tape) !== JSON.stringify(props.tape)));
  };

  return (
    <>
      <IconButton icon={<div class="i-mdi:delete w1em h1em" />} onClick={() => visible(true)} />
      <Modal
        title={'确认删除?'}
        visible={visible()}
        onOk={handleDelete}
        onCancel={() => visible(false)}
      >
        删除后，记录无法找回，请谨慎操作。
      </Modal>
    </>
  );
};