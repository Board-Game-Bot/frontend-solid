import AuthButton from '@/components/AuthButton';
import { user } from '@/store/user';
import UserInfoButton from '@/components/UserInfoButton';

export default function NavBar() {
  return (
    <div class="w-full h-full flex justify-center items-center drop-shadow-md relative">
      <div class="w-8/12 h-full flex items-center">
        <h1 class="m-0">NavBar</h1>
      </div>
      <div class="h-full flex flex-row-reverse items-center">
        {user().loginStatus === 'no' && <AuthButton />}
        {user().loginStatus === 'pending' && <h1>登录中</h1>}
        {user().loginStatus === 'login' && <UserInfoButton />}
      </div>
    </div>
  );
}
