import { ButtonProps, IconButton, Modal } from 'soku-ui';
import { UploadTapeReq } from './requests';
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
      <IconButton
        onClick={() => visible(true)}
        loading={uploadTapeReq.loading()}
        icon={<div class="i-mdi:cloud-upload w-2em h-2em" />}
      />
      <Modal
        title={'确认上传？'}
        visible={visible()}
        loading={uploadTapeReq.loading()}
        onCancel={() => visible(false)}
        onOk={() => uploadTapeReq.run(props.record)}
      >
        上传后，你的录像带将会在网络上共享。
      </Modal>
    </>
  );
};
