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
  const [newForm] = NewForm.useForm();
  const loginReq = useRequest(LoginReq, {
    onSuccess: ({ user: u, jwt: j }) => {
      Alert({
        children: '登陆成功',
      });
      user.s(u);
      jwt.s(j);
      navigate('/');
    },
  });
  const handleSubmit = () => {
    const data = newForm.gets();
    loginReq.run(data as LoginDto);
  };

  return (
    <>
      <NewForm form={newForm}>
        <NewForm.Item
          field={'id'}
          label={'用户 ID'}
          component={Input}
          placeholder={'请输入 ID'}
        />
        <NewForm.Item
          field={'passwd'}
          label={'密码'}
          component={Input}
          type={'password'}
          placeholder={'请输入密码'}
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