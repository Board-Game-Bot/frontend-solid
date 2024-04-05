import { JSX, Show } from 'solid-js';
import { cx } from '@soku-solid/utils';
import style from './index.module.scss';
import { ButtonProps } from './types';

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
          [style.btnAllow]: !props.disabled && !props.loading,
          [style.btnActive]: props.active,
          ...props.classList,
        },
      )}
      type={props.type ?? 'button'}
    >
      <Show when={props.icon}>
        {props.icon}
      </Show>
      <div class={'w-full'}>
        {props.children}
      </div>
    </button>
  );
};