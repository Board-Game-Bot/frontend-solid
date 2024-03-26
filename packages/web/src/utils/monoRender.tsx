export function monoRender<T>(key: keyof T) {
  return (record: T) => <div class={'font-mono'} style={{ 'white-space': 'nowrap', 'text-overflow': 'ellipsis' }}>{(record as any)[key]}</div>;
}