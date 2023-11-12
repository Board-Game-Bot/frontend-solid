import { useRoutes } from '@solidjs/router';
import { NAV_ITEMS, ROUTES } from './constants';
import { NavBar } from '@/pages/components';

export const App = () => {
  const Routes = useRoutes(ROUTES);
  return (
    <div class={'w-screen h-screen flex flex-col'}>
      <div class={'flex-0'}>
        <NavBar items={NAV_ITEMS} />
      </div>
      <div class={'flex-1 bg-#fafafa -z-2'}>
        <Routes />
      </div>
    </div>
  );
};

