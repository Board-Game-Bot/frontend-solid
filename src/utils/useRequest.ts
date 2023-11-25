import { createEffect, createSignal, onMount } from 'solid-js';

type ReqFn<T, P extends any[]> = (...args: P) => Promise<T>;

interface Option<T, E = string, P extends any[] = any[]> {
  onSuccess?: (data: T) => void | Promise<void>;
  onError?: (message: E) => void | Promise<void>;
  auto?: true;
  params?: P;
}

export const useRequest = <T, P extends any[]>(
  fn: ReqFn<T, P>,
  options?: Option<T, string, P>,
) => {
  const [loading, setLoading] = createSignal(false);
  const [data, setData] = createSignal<T>();

  const run = async (...args: P) => {
    if (loading()) return;
    try {
      setLoading(true);
      const data = await fn(...args);
      setData(() => data);
      options?.onSuccess?.(data);
    }
    catch (e: any) {
      options?.onError?.(e.message);
    }
    finally {
      setLoading(false);
    }
  };

  onMount(() => {
    if (options?.auto)
      run(...(options.params ?? []) as P);
  });

  return {
    loading,
    run,
    data,
  };
};