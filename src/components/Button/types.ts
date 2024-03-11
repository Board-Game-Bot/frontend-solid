import { JSX } from 'solid-js';

export interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'success' | 'danger' | 'blank';
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg';
}