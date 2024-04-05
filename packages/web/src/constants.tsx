import { RouteDefinition } from '@solidjs/router';
import { Accessor, JSX, lazy } from 'solid-js';
import { capitalize } from 'lodash-es';
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
  { path: '/game/:id/single', component: lazy(() => import('./pages/game/[id]/single')) },
  { path: '/game/:id/multi', component: lazy(() => import('./pages/game/[id]/multi')) },
  { path: '/game/:id/custom', component: lazy(() => import('./pages/game/[id]/custom')) },
  { path: '/game/:id/live', component: lazy(() => import('./pages/game/[id]/live')) },
  { path: '/tape', component: lazy(() => import('./pages/tape')) },
  { path: '/bot', component: lazy(() => import('./pages/bot')) },
  { path: '/rate', component: lazy(() => import('./pages/rate')) },
];

export const GAMES = [
  'snake',
  'reversi',
  'backgammon',
].reduce((map, gameName) => ({
  ...map,
  [gameName]: capitalize(gameName),
}), {} as Record<string, string>);

export const LANG_ICON_MAP: Record<string, Accessor<JSX.Element>> = {
  'c++': () => <div class="i-vscode-icons:file-type-cpp w-1em h-1em" />,
  'python': () => <div class="i-vscode-icons:file-type-python w-1em h-1em" />,
  'java': () => <div class="i-vscode-icons:file-type-java w-1em h-1em" />,
  'go': () => <div class="i-vscode-icons:file-type-go w-1em h-1em" />,
};