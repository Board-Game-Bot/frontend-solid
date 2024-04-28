import { useNavigate } from '@solidjs/router';
import { Alert, Button, Input, NewForm } from '@soku-solid/ui';
import { useRequest } from '@/utils';
import { jwt } from '@/store';
import { client } from '@/api';
import { RegisterAccountRequest } from '@/api/dtos';

interface Props {
  onLogin: () => void;
}

export const RegisterForm = (props: Props) => {
  const navigate = useNavigate();
  const registerReq = useRequest(
    client.RegisterAccount,
    {
      onSuccess: ({ Jwt }) => {
        Alert({
          children: '注册成功！',
        });
        jwt[1](Jwt);
        navigate('/');
      },
    });

  const [form] = NewForm.useForm();

  const handleSubmit = () => {
    const data = form.gets();
    registerReq.run(data as RegisterAccountRequest);
  };

  return (
    <NewForm form={form}>
      <NewForm.Item
        field={'Id'}
        label={'用户 ID'}
        component={Input}
        placeholder={'请输入 ID'}
        width={'100%'}
      />
      <NewForm.Item
        field={'Password'}
        label={'密码'}
        component={Input}
        type={'password'}
        placeholder={'请输入密码'}
        width={'100%'}
      />
      <div class={'flex gap-2 w-full mt6'}>
        <Button onClick={props.onLogin} class={'flex-1'} variant={'primary'}>登陆</Button>
        <Button onClick={handleSubmit} class={'flex-1'} variant={'primary'}>提交</Button>
      </div>
    </NewForm>
  );
};