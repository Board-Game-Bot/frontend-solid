import { RouteDefinition } from '@solidjs/router';
import { lazy } from 'solid-js';
import WelcomeView from '@/pages/welcome';

function Lazy(path: string) {
  return lazy(() => import(path));
}

const routes: RouteDefinition[] = [{ path: '', component: WelcomeView }];

export default routes;
