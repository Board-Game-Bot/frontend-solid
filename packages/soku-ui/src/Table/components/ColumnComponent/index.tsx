import { createMemo, on, ParentProps } from 'solid-js';
import { range } from 'lodash-es';

interface Props<T> extends ParentProps {
    record: T;
    index?: keyof T;
    deps?: (keyof T)[];
}

export function ColumnComponent<T>(props: Props<T>) {
  const depsValue = createMemo(() => {
    const deps = props.deps ?? [];
    return deps.map(dep => props.record[dep]);
  }, undefined, {
    equals: (prev, curr) =>
      prev.length === curr.length
        && range(prev.length).every((index: number) => prev[index] === curr[index]),
  });
  const cell = createMemo(() => props.index ? props.record[props.index] : '');
  const el = createMemo(on(() => [cell(), depsValue()], () => props.children));
  return <>{el()}</>;
}