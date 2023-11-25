import { UploadTapeReq } from './requests';
import { Button, ButtonProps } from '@/components';
import { useRequest } from '@/utils';
import { Tape } from '@/types';

interface Props extends ButtonProps {
  // TODO
  record: Omit<Tape, 'id' | 'userId'>
}

export const UploadButton = (props: Props) => {
  const uploadTapeReq = useRequest(UploadTapeReq);
  const handleClick = () => {
    uploadTapeReq.run(props.record);
  };

  return (
    <Button
      onClick={handleClick}
      loading={uploadTapeReq.loading()}
    >
      上传
    </Button>
  );
};
