import { RouteDefinition } from '@solidjs/router';
import { lazy } from 'solid-js';
import { NavItem } from '@/pages/components';

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
    component: lazy(() => import('./pages/index')),
  },
  {
    path: '/auth',
    component: lazy(() => import('./pages/auth/index')),
  },
];
