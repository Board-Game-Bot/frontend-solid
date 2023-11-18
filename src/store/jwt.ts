import { createLocalStorageSignal, useRequest } from '@/utils';
import { LoadProfileReq } from '@/requests';
import { setUser } from '@/store/user';

const [jwt, setJwt] = createLocalStorageSignal('jwt');

useRequest(
  LoadProfileReq,
  {
    auto: true,
    onSuccess: (data) => {
      setUser(data);
    },
  },
);

export {
  jwt,
  setJwt,
};