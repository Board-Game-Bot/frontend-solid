import { UploadTapeReq } from './requests';
import { Button, ButtonProps, Modal } from '@/components';
import { signal, useRequest } from '@/utils';
import { Tape } from '@/types';

interface Props extends ButtonProps {
  record: Omit<Tape, 'id' | 'userId'>;
  onOk?: () => void;
}

export const UploadButton = (props: Props) => {
  const uploadTapeReq = useRequest(
    UploadTapeReq,
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
      <Button
        onClick={() => visible(true)}
        loading={uploadTapeReq.loading()}
      >
        上传
      </Button>
      <Modal
        title={'确定要上传此录像带吗？'}
        visible={visible()}
        loading={uploadTapeReq.loading()}
        onCancel={() => visible(false)}
        onOk={() => uploadTapeReq.run(props.record)}
      />
    </>
  );
};
