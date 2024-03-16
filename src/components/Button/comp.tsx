import { JSX, Show } from 'solid-js';
import style from './index.module.scss';
import { cx } from '@/utils';
import { ButtonProps } from '@/components';

interface Props extends ButtonProps {
  active?: boolean;
  icon?: JSX.Element;
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
      <Show when={props.icon}>
        {props.icon}
      </Show>
      <div>
        {props.children}
      </div>
    </button>
  );
};