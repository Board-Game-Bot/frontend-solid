import style from './index.module.scss';
import { cx } from '@/utils';
import { ButtonProps } from '@/components';

interface Props extends ButtonProps {
  active?: boolean;
}

export const Button = (props: Props) => {
  return (
    <button
      {...props}
      class={cx(
        props.class,
        style.btn,
        {
          [style.btnLoading]: props.loading,
          [style.btnAllow]: !props.disabled,
          [style.btnActive]: props.active,
          ...props.classList,
        },
      )}
      type={props.type ?? 'button'}
    >
      {props.children}
    </button>
  );
};