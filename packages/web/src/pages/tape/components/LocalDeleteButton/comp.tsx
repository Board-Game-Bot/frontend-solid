import { IconButton, Modal } from 'soku-ui';
import { signal } from '@/utils';
import { Tape } from '@/types';
import { useLocalTapes } from '@/utils/useLocalTapes';

interface Props {
  tape: Tape;
  onOk?: () => void;
}

export const LocalDeleteButton = (props: Props) => {
  const visible = signal(false);

  const [tapes, setTapes] = useLocalTapes();
  const handleDelete = () => {
    setTapes(tapes().filter(tape => JSON.stringify(tape) !== JSON.stringify(props.tape)));
  };

  return (
    <>
      <IconButton icon={<div class="i-mdi:delete w-2em h-2em" />} onClick={() => visible(true)} />
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