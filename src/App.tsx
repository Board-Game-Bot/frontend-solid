import { useRoutes } from '@solidjs/router';
import routes from './config/routes';

export function App() {
  const Routes = useRoutes(routes);

  return <Routes />;
}
