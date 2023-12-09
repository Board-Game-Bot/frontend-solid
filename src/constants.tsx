import { RouteDefinition } from '@solidjs/router';
import { lazy } from 'solid-js';
import { NavItem } from '@/pages/components';

export const NAV_ITEMS: NavItem[] = [
  { title: '主页', id: '/' },
  { title: '游戏', id: '/game' },
  { title: '录像', id: '/tape' },
  { title: '代码', id: '/bot' },
  { title: '天梯', id: '/rate' },
];

export const ROUTES: RouteDefinition[] = [
  { path: '/', component: lazy(() => import('./pages')) },
  { path: '/auth', component: lazy(() => import('./pages/auth')) },
  { path: '/game', component: lazy(() => import('./pages/game')) },
  { path: '/game/:id', component: lazy(() => import('./pages/game/[id]')) },
  { path: '/game/:id/single', component: lazy(() => import('./pages/game/[id]/single')) },
  { path: '/game/:id/multi', component: lazy(() => import('./pages/game/[id]/multi')) },
  { path: '/game/:id/custom', component: lazy(() => import('./pages/game/[id]/custom')) },
  { path: '/tape', component: lazy(() => import('./pages/tape')) },
  { path: '/bot', component: lazy(() => import('./pages/bot')) },
  { path: '/rate', component: lazy(() => import('./pages/rate')) },
];

export const GAMES = [
  'snake',
  'reversi',
  'backgammon',
];