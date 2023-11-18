import { JSX } from 'solid-js';
import { cx } from '@/utils';

interface Props extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger';
  loading?: boolean;
}

export const Button = (props: Props) => {
  const bgColor = () => props.variant === 'primary'
    ? 'bg-blue-5'
    : props.variant === 'danger'
      ? 'bg-red-5'
      : '';

  return (
    <button
      {...props}
      class={cx(
        props.class,
        'block',
        'cursor-pointer rounded-2 text-white hover_black border-0',
        bgColor(),
      )}
    >
      {props.children}
      {props.loading ? '...' : ''}
    </button>
  );
};