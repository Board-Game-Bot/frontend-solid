import { JSX } from 'solid-js';

export interface Column<T> {
  index?: keyof T;
  title?: string;
  render?: (item: T, index: number) => JSX.Element;
  deps?: (keyof T)[];
  width?: string;
  align?: 'start' | 'center' | 'end';
  sticky?: 'left' | 'right';
}