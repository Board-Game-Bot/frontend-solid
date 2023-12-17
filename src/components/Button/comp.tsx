import { cx } from '@/utils';
import { ButtonProps } from '@/components';

interface Props extends ButtonProps {}

export const Button = (props: Props) => {
  const color = () => {
    const { variant = 'primary' } = props;
    switch (variant) {
    case 'primary':
      return 'bg-blue-5 shadow-#66f text-white';
    case 'danger':
      return 'bg-red-5 shadow-#f66 text-white';
    case 'success':
      return 'bg-green-5 shadow-#6f6 text-white';
    case 'blank':
      return 'bg-#f6f8fa text-black shadow-#ccc outline-1 outline-solid outline-#d6d8db';
    default:
      return '';
    }
  };

  const size = () => {
    const { size = 'md' } = props;
    switch (size) {
    case 'md':
      return 'text-4 py-1 px-3.75 rounded-md shadow-sm';
    case 'lg':
      return 'text-lg px-12px py-5px rounded-md shadow-sm';
    default:
      return '';
    }
  };

  return (
    <button
      {...props}
      class={cx(
        props.class,
        'inline-block h-fit cursor-pointer rounded-2  hover_black hover:after:rounded-1 border-0',
        size(),
        color(),
        'font-bold',
      )}
      type={props.type ?? 'button'}
    >
      {props.children}
      {props.loading ? '...' : ''}
    </button>
  );
};