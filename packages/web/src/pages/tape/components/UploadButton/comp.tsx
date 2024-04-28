import { ButtonProps, IconButton, Modal } from '@soku-solid/ui';
import { createSignal } from 'solid-js';
import { pick } from 'lodash-es';
import { useRequest } from '@/utils';
import { Tape } from '@/api/entity';
import { client } from '@/api';

interface Props extends ButtonProps {
  record: Tape;
  onOk?: () => void;
}

export const UploadButton = (props: Props) => {
  const visible = createSignal(false);

  const createTapeReq = useRequest(
    client.CreateTape,
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
        loading={createTapeReq.loading()}
        icon={<div class="i-mdi:cloud-upload w1em h1em" />}
      />
      <Modal
        title={'确认上传？'}
        visible={visible[0]()}
        loading={createTapeReq.loading()}
        onCancel={() => visible[1](false)}
        onOk={() => {
          console.log('re', props.record);
          const filteredRecord = pick(props.record, ['GameId', 'Json']);
          filteredRecord.Json = JSON.stringify(filteredRecord.Json);
          createTapeReq.run(filteredRecord);
        }}
      >
        上传后，你的录像带将会在网络上共享。
      </Modal>
    </>
  );
};
