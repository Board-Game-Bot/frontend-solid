import { createLocalStorageSignal, useRequest } from '@/utils';
import { LoadProfileReq } from '@/requests';
import { user } from '@/store';

const jwt = createLocalStorageSignal<string>('jwt', '');

useRequest(
  LoadProfileReq,
  {
    auto: true,
    onSuccess: (data) => {
      user[1](data);
    },
  },
);

export {
  jwt,
};