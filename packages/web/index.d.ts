interface ChangeValue<T> {
    value?: T;
    onChange?: (value: T) => void;
}

type MaybePromise<T> = T | Promise<T>;
