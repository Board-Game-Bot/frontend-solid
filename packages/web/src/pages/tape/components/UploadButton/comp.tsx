import { ButtonProps, IconButton, Modal } from '@soku-solid/ui';
import { createSignal } from 'solid-js';
import { UploadTapeReq } from './requests';
import { useRequest } from '@/utils';
import { Tape } from '@/types';

interface Props extends ButtonProps {
  record: Omit<Tape, 'id' | 'userId'>;
  onOk?: () => void;
}

export const UploadButton = (props: Props) => {
  const visible = createSignal(false);

  const uploadTapeReq = useRequest(
    UploadTapeReq,
    {
      onSuccess: () => {
        visible[1](false);
        props.onOk?.();
      },
    },
  );


  return (
    <>
      <IconButton
        onClick={() => visible[1](true)}
        loading={uploadTapeReq.loading()}
        icon={<div class="i-mdi:cloud-upload w1em h1em" />}
      />
      <Modal
        title={'确认上传？'}
        visible={visible[0]()}
        loading={uploadTapeReq.loading()}
        onCancel={() => visible[1](false)}
        onOk={() => uploadTapeReq.run(props.record)}
      >
        上传后，你的录像带将会在网络上共享。
      </Modal>
    </>
  );
};
