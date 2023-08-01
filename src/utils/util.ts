import { ResponseError } from '@/api';
import { Accessor, createSignal } from 'solid-js';

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

export function useRequest<T, P extends unknown[]>(
  api: (...args: P) => Promise<{
    statusCode: number;
    data: T;
  }>,
): [
  Accessor<T>,
  Accessor<any>,
  Accessor<boolean>,
  (...args: P) => Promise<[T | null, any]>,
] {
  const [data, setData] = createSignal<T>();
  const [isLoading, setIsLoading] = createSignal(false);
  const [error, setError] = createSignal<any>();

  const run = async (...args: P): Promise<[T | null, any]> => {
    setIsLoading(true);
    const p = api(...args).then(({ statusCode, data: d }) => {
      if (statusCode === 200) {
        // FIXME
        setData(d as any);
        return d;
      }
      throw new Error(d as any);
    });
    p.catch((error) => {
      setError(error);
    }).finally(() => {
      setIsLoading(false);
    });

    try {
      return [await p, null];
    } catch (e) {
      return [null, e];
    }
  };
  return [
    data as Accessor<T>,
    error as Accessor<any>,
    isLoading as Accessor<boolean>,
    run,
  ];
}
