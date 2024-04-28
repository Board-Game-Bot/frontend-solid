import { IconButton, Modal } from '@soku-solid/ui';
import { createSignal } from 'solid-js';
import { useLocalTapes } from '@/utils';
import { Tape } from '@/api/entity';

interface Props {
  tape: Tape;
  onOk?: () => void;
}

export const LocalDeleteButton = (props: Props) => {
  const visible = createSignal(false);

  const tapes = useLocalTapes();
  const handleDelete = () => {
    tapes[1](tapes[0]().filter(tape => JSON.stringify(tape) !== JSON.stringify(props.tape)));
  };

  return (
    <>
      <IconButton icon={<div class="i-mdi:delete w1em h1em" />} onClick={() => visible[1](true)} />
      <Modal
        title={'确认删除?'}
        visible={visible[0]()}
        onOk={handleDelete}
        onCancel={() => visible[1](false)}
      >
        删除后，记录无法找回，请谨慎操作。
      </Modal>
    </>
  );
};