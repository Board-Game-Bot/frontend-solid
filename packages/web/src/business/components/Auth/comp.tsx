import { useNavigate } from '@solidjs/router';
import { Img } from '@soku-solid/ui';
import { createEffect } from 'solid-js';
import { user } from '@/store';

export const Auth = () => {
  const nav = useNavigate();
  const handleClick = () => {
    nav('/auth');
  };

  createEffect(() => console.log(user[0]()?.avatar));

  return (
    <div
      class={'p3 hover:bg-coolGray/7 rounded-xl cursor-pointer flex gap3 items-center font-600 text-2xl'}
      onClick={handleClick}
    >
      <Img shape={'circle'} src={user[0]()?.avatar} />
      <div>{user[0]()?.id}</div>
    </div>
  );
};