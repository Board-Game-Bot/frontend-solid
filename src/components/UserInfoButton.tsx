import { DropdownOption } from '@/components/common/Dropdown';
import { setJwt, setUser, user } from '@/store/user';
import { Dropdown } from '@/components/common';
import { useNavigate } from '@solidjs/router';

export default function UserInfoButton() {
  const navigate = useNavigate();

  const options: DropdownOption[] = [
    { value: 'space', label: '个人空间' },
    { value: 'settings', label: '修改信息' },
    {
      value: 'logout',
      label: (
        <div class="text-black hover:bg-red-700 hover:text-white m-0 px-2 py-2 rounded-md">
          注销账号
        </div>
      ),
    },
  ];

  const handleOptionClick = (key: string | number) => {
    if (key === 'space') {
      navigate(`/user/${user().id}`, { replace: true });
    } else if (key === 'logout') {
      setUser({
        id: '',
        name: '',
        avatar: '',
        loginStatus: 'no',
      });
      setJwt('');
    }
  };

  return (
    <Dropdown
      options={options}
      class="absolute right-4 select-none"
      onOptionClick={handleOptionClick}
    >
      <div class="rounded-md hover:bg-slate-500 w-[100px] h-[50px] px-2 flex items-center">
        <img
          class="rounded-full w-[40px] h-[40px] border-2 border-slate-200"
          src={user().avatar}
          alt="avatar"
        />
        <span class="ml-2 text-slate-100 text-xl font-bold">操作</span>
      </div>
    </Dropdown>
  );
}
