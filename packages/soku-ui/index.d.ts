type MaybePromise<T> = T | Promise<T>;

interface ChangeValue<T> {
    value?: T;
    onChange?: (value?: T) => MaybePromise<any>
}