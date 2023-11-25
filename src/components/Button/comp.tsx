import { cx } from '@/utils';
import { ButtonProps } from '@/components';

interface Props extends ButtonProps {}

export const Button = (props: Props) => {
  const bgColor = () => {
    const { variant = 'primary' } = props;
    return variant === 'primary'
      ? 'bg-blue-5 shadow-#66f'
      : variant === 'danger'
        ? 'bg-red-5 shadow-#f66'
        : '';
  };

  const size = () => {
    const { size = 'mid' } = props;
    switch (size) {
    case 'mid':
      return 'text-md py-1 px-3.75 rounded-md shadow-sm';
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