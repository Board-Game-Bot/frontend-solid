export function monoRender<T>(key: keyof T) {
  return (record: T) => <div class={'font-mono'}>{(record as any)[key]}</div>;
}