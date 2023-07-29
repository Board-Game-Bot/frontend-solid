import { For } from 'solid-js';
import { Link, useRoutes } from '@solidjs/router';
import routes from './config/routes';
import NavBar from './components/common/NavBar';
import SideBar from './components/SideBar';
import { user } from '@/store/user';

export default function App() {
  const Routes = useRoutes(routes);

  const optionGroups = () => [
    {
      title: '公共',
      children: [{ title: '网站主页', path: '/' }],
    },
    {
      title: '用户',
      children: [
        {
          title: '个人主页',
          path: `/user${user().id ? `/${user().id}` : ''}`,
        },
      ],
    },
    {
      title: '游戏',
      children: [
        { title: '游戏大厅', path: '/game/total' },
        { title: '游戏记录', path: '/game/record' },
        { title: '天梯排名', path: '/game/rank' },
      ],
    },
  ];

  return (
    <div class="flex flex-col w-screen h-screen bg-slate-100">
      <div class="flex-grow-0 w-full h-[70px] bg-slate-700 text-white drop-shadow-lg">
        <NavBar />
      </div>
      <div class="flex flex-1 w-full overflow-auto">
        <div class="w-[300px] h-full flex-grow-0 bg-gray-100">
          <SideBar>
            <div class="full box-border px-2">
              <For each={optionGroups()}>
                {(group) => (
                  <>
                    <h2 class="pl-3">{group.title}</h2>
                    {group.children.map((item) => (
                      <Link
                        activeClass="bg-gray-2"
                        class="decoration-none text-black block py-3 pl-5 hover:bg-gray-2 rounded-md"
                        href={item.path}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </>
                )}
              </For>
            </div>
          </SideBar>
        </div>
        <main class="flex-1 h-full overflow-auto">
          <Routes />
        </main>
      </div>
    </div>
  );
}
