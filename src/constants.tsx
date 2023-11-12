import { RouteDefinition } from '@solidjs/router';
import { NavItem } from '@/pages/components';
import { WelcomePage } from '@/pages';

export const NAV_ITEMS: NavItem[] = [
  {
    title: '主页',
    id: '/',
  },
  {
    title: '游戏',
    id: '/game',
  },
];

export const ROUTES: RouteDefinition[] = [
  {
    path: '/',
    element: <WelcomePage />,
  },
];
