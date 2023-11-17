import { useNavigate } from '@solidjs/router';
import { LoginReq } from './requests';
import { LoginDto } from './types';
import { Alert, Button, Form, Input } from '@/components';
import { useRequest } from '@/utils';
import { setJwt, setUser } from '@/store';

export const LoginForm = () => {
  const navigate = useNavigate();
  const loginReq = useRequest(LoginReq, {
    onSuccess: ({ user, jwt }) => {
      Alert({
        children: '登陆成功',
      });
      setUser(user);
      setJwt(jwt);
      navigate('/');
    },
  });
  const handleSubmit = (data: Record<string, any>) => {
    loginReq.run(data as LoginDto);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input title={'用户 ID'} name={'id'} />
      <Input title={'密码'} name={'passwd'} type={'password'}/>
      <Button class={'w-full'} variant={'primary'}>提交</Button>
    </Form>
  );
};