import { RouteDefinition } from '@solidjs/router';
import { lazy } from 'solid-js';
import WelcomeView from '@/pages/welcome';

const LazyNotFound = lazy(() => import('../template/404'));
const LazyUserView = lazy(() => import('../pages/user/index'));
const LazyGameTotal = lazy(() => import('../pages/game-total/index'));
const LazyGameRank = lazy(() => import('../pages/game-rank/index'));
const LazyGameRecord = lazy(() => import('../pages/game-record/index'));
const LazyGameSingle = lazy(() => import('../pages/game-single/index'));

const routes: RouteDefinition[] = [
  { path: '', component: WelcomeView },
  { path: '/game/total', component: LazyGameTotal },
  { path: '/game/rank', component: LazyGameRank },
  { path: '/game/record', component: LazyGameRecord },
  { path: '/game/:id', component: LazyGameSingle },
  { path: '/user/:id', component: LazyUserView },
  { path: '/*all', component: LazyNotFound },
];

export default routes;
