type MaybePromise<T> = T | Promise<T>;

export type Validator =
  | ((_: string) => MaybePromise<string>)
  | false
  | undefined;