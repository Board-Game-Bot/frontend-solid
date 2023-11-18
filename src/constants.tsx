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
    component: lazy(() => import('./pages')),
  },
  {
    path: '/auth',
    component: lazy(() => import('./pages/auth')),
  },
  {
    path: '/game',
    component: lazy(() => import('./pages/game')),
  },
  {
    path: '/game/:id',
    component: lazy(() => import('./pages/game/[id]')),
  },
  {
    path: '/game/:id/play',
    component: lazy(() => import('./pages/game/[id]/play')),
  },
];
