import { useNavigate } from '@solidjs/router';
import { Alert, Button, Form, Input } from 'soku-ui';
import { LoginReq } from './requests';
import { LoginDto } from './types';
import { useRequest } from '@/utils';
import { setJwt, setUser } from '@/store';

interface Props {
  onRegister: () => void
}

export const LoginForm = (props: Props) => {
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
      <div class={'flex gap-2 w-full mt6'}>
        <Button class={'flex-1'} onClick={props.onRegister}>注册</Button>
        <Button class={'flex-1'} onClick={() => form.submit()} variant={'primary'}>提交</Button>
      </div>
    </Form>
  );
};