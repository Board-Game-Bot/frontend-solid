import { capitalize } from 'lodash-es';
import { LoginForm, RegisterForm } from './components';
import { Button } from '@/components';
import { useToggle } from '@/utils';

const AuthPage = () => {
  const [mode, toggleMode, anotherMode] = useToggle<'register' | 'login'>(['register', 'login'], 'login');

  return (
    <div class={'full flex center'}>
      <div class={'rounded-3 shadow-xl box-content p10'}>
        <Button class={'w-full'} variant={'primary'} onClick={toggleMode}>切换到 {capitalize(anotherMode())} Mode</Button>
        {mode() === 'login' && <LoginForm />}
        {mode() === 'register' && <RegisterForm />}
      </div>
    </div>
  );
};

export default AuthPage;