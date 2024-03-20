import { JSX } from 'solid-js';

export interface Column<T> {
  index?: keyof T;
  title?: string;
  render?: (item: T, index: number) => JSX.Element;
  width?: number;
  align?: 'start' | 'center' | 'end';
}