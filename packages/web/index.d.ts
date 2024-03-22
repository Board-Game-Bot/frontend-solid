interface ChangeValue<T> {
    value?: T;
    onChange?: (value: T) => void;
}
