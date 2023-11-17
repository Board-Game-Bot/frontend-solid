import { createSignal } from 'solid-js';

type ReqFn<T, P extends any[]> = (...args: P) => Promise<T>;

interface Option<T, E = string> {
  onSuccess?: (data: T) => void | Promise<void>;
  onError?: (message: E) => void | Promise<void>;
}

export const useRequest = <T, P extends any[]>(
  fn: ReqFn<T, P>,
  options?: Option<T>,
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

  return {
    loading,
    run,
  };
};