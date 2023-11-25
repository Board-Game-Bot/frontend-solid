import { JSX } from 'solid-js';

export interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger';
  loading?: boolean;
  size?: 'small' | 'mid' | 'large';
}