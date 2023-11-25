import { JsonTapeReq } from './requests';
import { Button, ButtonProps } from '@/components';
import { useRequest } from '@/utils';
import { Modal } from '@/components/Modal';
import { signal } from '@/utils/signal';

interface Props extends ButtonProps {
  // TODO
  id: string;
}

export const WatchButton = (props: Props) => {
  const watchVisible = signal(false);

  const jsonTapeReq = useRequest(JsonTapeReq, {
    onSuccess: () => {
      watchVisible(true);
    },
  });
  const handleClick = () => {
    jsonTapeReq.run({
      tapeId: props.id,
    });
  };

  return (
    <>
      <Button
        onClick={handleClick}
        loading={jsonTapeReq.loading()}
      >
        观看
      </Button>
      <Modal
        visible={watchVisible()}
        onOk={() => watchVisible(false)}
        onCancel={() => watchVisible(false)}
      >
        观看{props.id}
      </Modal>
    </>
  );
};
