import { ButtonProps, IconButton, Modal } from '@soku-solid/ui';
import { useSignal } from '@soku-solid/utils';
import { UploadTapeReq } from './requests';
import { useRequest } from '@/utils';
import { Tape } from '@/types';

interface Props extends ButtonProps {
  record: Omit<Tape, 'id' | 'userId'>;
  onOk?: () => void;
}

export const UploadButton = (props: Props) => {
  const visible = useSignal(false);

  const uploadTapeReq = useRequest(
    UploadTapeReq,
    {
      onSuccess: () => {
        visible.s(false);
        props.onOk?.();
      },
    },
  );


  return (
    <>
      <IconButton
        onClick={() => visible.s(true)}
        loading={uploadTapeReq.loading()}
        icon={<div class="i-mdi:cloud-upload w1em h1em" />}
      />
      <Modal
        title={'确认上传？'}
        visible={visible.s()}
        loading={uploadTapeReq.loading()}
        onCancel={() => visible.s(false)}
        onOk={() => uploadTapeReq.run(props.record)}
      >
        上传后，你的录像带将会在网络上共享。
      </Modal>
    </>
  );
};
