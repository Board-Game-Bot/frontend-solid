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

  const form = Form.useForm();

  return (
    <Form
      form={form}
      onSubmit={handleSubmit}
    >
      <Form.Item name={'id'}>
        <Input title={'用户 ID'} />
      </Form.Item>
      <Form.Item name={'passwd'}>
        <Input title={'密码'} type={'password'}/>
      </Form.Item>
      <Button onClick={() => form.submit()} class={'w-full mt8'} variant={'primary'}>提交</Button>
    </Form>
  );
};