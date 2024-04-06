import { useNavigate } from '@solidjs/router';
import { Alert, Button, Input, NewForm } from '@soku-solid/ui';
import { LoginReq } from './requests';
import { LoginDto } from './types';
import { useRequest } from '@/utils';
import { user, jwt } from '@/store';

interface Props {
  onRegister: () => void
}

export const LoginForm = (props: Props) => {
  const navigate = useNavigate();
  const [form] = NewForm.useForm();
  const loginReq = useRequest(LoginReq, {
    onSuccess: ({ user: u, jwt: j }) => {
      Alert({
        children: '登陆成功',
      });
      user[1](u);
      jwt[1](j);
      navigate('/');
    },
  });
  const handleSubmit = () => {
    const data = form.gets();
    loginReq.run(data as LoginDto);
  };

  return (
    <>
      <NewForm form={form}>
        <NewForm.Item
          field={'id'}
          label={'用户 ID'}
          component={Input}
          placeholder={'请输入 ID'}
          width={'100%'}
        />
        <NewForm.Item
          field={'passwd'}
          label={'密码'}
          component={Input}
          type={'password'}
          placeholder={'请输入密码'}
          width={'100%'}
        />
        <div class={'flex gap-2 w-full mt6'}>
          <Button
            class={'flex-1'}
            onClick={props.onRegister}
          >
            注册
          </Button>
          <Button
            class={'flex-1'}
            onClick={handleSubmit}
            variant={'primary'}
            loading={loginReq.loading()}
          >
            提交
          </Button>
        </div>
      </NewForm>
    </>
  );
};