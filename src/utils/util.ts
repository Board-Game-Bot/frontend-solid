import { ResponseError } from '@/api';
import { Accessor, createEffect, createSignal } from 'solid-js';

export function getFormData(e: SubmitEvent): Record<string, any> {
  const data = new FormData(e.target as HTMLFormElement);
  const res: Record<string, any> = {};

  for (const [k, v] of data.entries()) {
    res[k] = v;
  }

  return res;
}

export function handleResponseError(error: ResponseError) {
  if (error.statusCode === 400) {
    window.alert(`格式错误：${error.message.join('，')}`);
  } else if (error.statusCode === 401) {
    window.alert(`鉴权错误：你可能需要重新登录`);
  } else if (error.statusCode === 4000) {
    window.alert(error.message);
  } else {
    window.alert(`意外错误：${(error as any).error}`);
  }
}

export function useRequest<T>(
  api: () => Promise<{
    statusCode: number;
    data: T;
  }>,
): [Accessor<T>, Accessor<any>, Accessor<boolean>, () => Promise<any>] {
  const [data, setData] = createSignal<T>();
  const [isLoading, setIsLoading] = createSignal(false);
  const [error, setError] = createSignal<any>();

  const run = () => {
    setIsLoading(true);
    api()
      .then(({ statusCode, data: d }) => {
        if (statusCode === 200) {
          // FIXME
          setData(d as any);
        }
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return [data, error, isLoading, run] as [
    Accessor<T>,
    Accessor<any>,
    Accessor<boolean>,
    () => Promise<any>,
  ];
}
