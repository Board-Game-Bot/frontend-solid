import { useNavigate } from '@solidjs/router';
import { Img } from '../../../../../soku-ui/src';
import { user } from '@/store';

export const Auth = () => {
  const nav = useNavigate();
  const handleClick = () => {
    nav('/auth');
  };

  return (
    <div
      class={'p3 hover:bg-coolGray/7 rounded-xl cursor-pointer'}
      onClick={handleClick}
    >
      <Img shape={'circle'} src={user()?.avatar} />
    </div>
  );
};