import { useNavigate } from '@solidjs/router';
import { Alert, Button, Input, NewForm } from 'soku-ui';
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

  const [form] = NewForm.useForm();

  const handleSubmit = () => {
    const data = form.gets();
    registerReq.run(data as RegisterDto);
  };

  return (
    <NewForm
      form={form}
    >
      <NewForm.Item
        field={'id'}
        label={'用户 ID'}
        component={Input}
        props={{
          placeholder: '请输入 ID',
        }}
      />
      <NewForm.Item
        field={'passwd'}
        label={'密码'}
        component={Input}
        props={{
          type: 'password',
          placeholder: '请输入密码',
        }}
      />
      <div class={'flex gap-2 w-full mt6'}>
        <Button onClick={props.onLogin} class={'flex-1'} variant={'primary'}>登陆</Button>
        <Button onClick={handleSubmit} class={'flex-1'} variant={'primary'}>提交</Button>
      </div>
    </NewForm>
  );
};