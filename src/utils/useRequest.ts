import { createSignal, onMount } from 'solid-js';

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

  const run = async (...args: P) => {
    try {
      setLoading(true);
      const data = await fn(...args);
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
  };
};