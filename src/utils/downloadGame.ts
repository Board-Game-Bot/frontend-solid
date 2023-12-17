import { createSignal } from 'solid-js';

export const [loadingMap, setLoadingMap] = createSignal<Record<string, number>>({});

export const downloadGame = (npmPackage: string, version: string, stuff: string) => {
  const id = `${npmPackage}-${version}-${stuff}`;
  if (document.getElementById(id)) return ;
  const dom = document.createElement('script');
  dom.type = 'module';
  dom.id = id;
  dom.src = `https://cdn.jsdelivr.net/npm/${npmPackage}@${version}/dist/${stuff}/index.iife.js`;
  document.body.append(dom);
  dom.onload = () => {
    const cnt = loadingMap()[`${npmPackage}-${version}`] ?? 0;
    setLoadingMap({
      ...loadingMap(),
      [`${npmPackage}-${version}`]: cnt + 1,
    });
  };
};
