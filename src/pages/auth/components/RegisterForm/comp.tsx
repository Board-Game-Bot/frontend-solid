import { useNavigate } from '@solidjs/router';
import { RegisterReq } from './requests';
import { RegisterDto } from './types';
import { Alert, Button, Form, Input } from '@/components';
import { useRequest } from '@/utils';
import { setJwt, setUser } from '@/store';

export const RegisterForm = () => {
  const navigate = useNavigate();
  const registerReq = useRequest(
    RegisterReq,
    {
      onSuccess: ({ user, jwt }) => {
        Alert({
          children: '注册成功！',
        });
        setUser(user);
        setJwt(jwt);
        navigate('/');
      },
    });

  const handleSubmit = (data: any) => {
    registerReq.run(data as RegisterDto);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input title={'用户 ID'} name={'id'} />
      <Input title={'密码'} name={'passwd'} type={'password'}/>
      <Button class={'w-full'} variant={'primary'}>提交</Button>
    </Form>
  );
};