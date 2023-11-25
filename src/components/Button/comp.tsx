import { JSX } from 'solid-js';
import { cx } from '@/utils';

interface Props extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger';
  loading?: boolean;
  size?: 'small' | 'mid' | 'large';
}

export const Button = (props: Props) => {
  const bgColor = () => props.variant === 'primary'
    ? 'bg-blue-5 shadow-#66f'
    : props.variant === 'danger'
      ? 'bg-red-5 shadow-#f66'
      : '';

  const size = () => {
    const { size = 'mid' } = props;
    switch (size) {
    case 'mid':
      return 'text-md py-2 px-8 rounded-md shadow-sm';
    }
    return '';
  };

  return (
    <button
      {...props}
      class={cx(
        props.class,
        size(),
        'font-bold',
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