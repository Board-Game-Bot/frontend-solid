import { RouteDefinition } from '@solidjs/router';
import WelcomeView from '../pages/welcome';
import { lazy } from 'solid-js';

function Lazy(path: string) {
  return lazy(() => import(path));
}

const routes: RouteDefinition[] = [{ path: '/', component: WelcomeView }];

export default routes;
