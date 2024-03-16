import { capitalize } from 'lodash-es';
import { LoginForm, RegisterForm } from './components';
import { Button } from '@/components';
import { useToggle } from '@/utils';

const AuthPage = () => {
  const [mode, toggleMode, anotherMode] = useToggle<'register' | 'login'>(['register', 'login'], 'login');

  return (
    <div class={'full flex center'}>
      <div class={'rounded-3 shadow-xl box-content p10'}>
        {mode() === 'login' && <LoginForm onRegister={toggleMode} />}
        {mode() === 'register' && <RegisterForm onLogin={toggleMode} />}
      </div>
    </div>
  );
};

export default AuthPage;