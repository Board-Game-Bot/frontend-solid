import { useNavigate } from '@solidjs/router';
import { Alert, Button, Form, Input } from 'soku-ui';
import { RegisterReq } from './requests';
import { RegisterDto } from './types';
import { useRequest } from '@/utils';
import { setJwt, setUser } from '@/store';

interface Props {
  onLogin: () => void;
}

export const RegisterForm = (props: Props) => {
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
        <Button onClick={props.onLogin} class={'flex-1'} variant={'primary'}>登陆</Button>
        <Button onClick={() => form.submit()} class={'flex-1'} variant={'primary'}>提交</Button>
      </div>
    </Form>
  );
};