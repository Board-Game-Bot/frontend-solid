import { useLocation, useNavigate, useRoutes } from '@solidjs/router';
import * as core from '@soku-games/core';
import { NAV_ITEMS, ROUTES } from './constants';
import { Auth } from './components';
import { NavBar } from '@/pages/components';


Object.assign(window, {
  core,
});

export const App = () => {
  const Routes = useRoutes(ROUTES);

  const location = useLocation();

  const navigate = useNavigate();

  const handleItemClick = (id: string) => {
    navigate(id);
  };

  return (
    <>
      <div class={'w-screen h-screen flex flex-col'}>
        <div class={'flex-0 z-2'}>
          <NavBar
            items={NAV_ITEMS}
            value={location.pathname}
            onItemClick={handleItemClick}
            extra={<Auth />}
          />
        </div>
        <div class={'flex-1 bg-#fafafa'}>
          <Routes />
        </div>
      </div>
      <div class={'z-50 fixed w-screen h-screen top-0 left-0 pointer-events-none'} id={'alert'} />
    </>
  );
};

