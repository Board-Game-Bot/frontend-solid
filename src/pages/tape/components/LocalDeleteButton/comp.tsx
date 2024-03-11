import { Button, Modal } from '@/components';
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
      <Button variant={'danger'} onClick={() => visible(true)}>删除</Button>
      <Modal
        title={'确认删除?'}
        visible={visible()}
        onOk={handleDelete}
        onCancel={() => visible(false)}
      />
    </>
  );
};