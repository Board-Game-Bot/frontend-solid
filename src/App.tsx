import { useRoutes } from '@solidjs/router';
import routes from './config/routes';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';

export function App() {
  const Routes = useRoutes(routes);

  return (
    <div class="flex flex-col w-screen h-screen bg-slate-100">
      <div class="flex-grow-0 w-full h-[70px] bg-slate-700 text-white drop-shadow-lg">
        <NavBar />
      </div>
      <div class="flex flex-1 w-full overflow-auto">
        <div class="w-[200px] h-full flex-grow-0 bg-gray-100">
          <SideBar />
        </div>
        <main class="flex-1 h-full overflow-auto">
          <Routes />
        </main>
      </div>
    </div>
  );
}
