export type MaybePromise<T> = Promise<T> | T;

export interface ChangeValue<T> {
    value?: T;
    onChange?: (value?: T) => MaybePromise<any>;
}