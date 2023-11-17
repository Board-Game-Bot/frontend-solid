import { JSX } from 'solid-js';

interface Props extends JSX.InputHTMLAttributes<HTMLInputElement> {

}

export const Input = (props: Props) => {
  return (
    <div class={['relative my8', props.class].join(' ')}>
      <label class={'absolute -top-5 left-0 font-500 text-12px'} for={props.name}>{props.title}</label>
      <input
        {...props}
        class={['block w-full box-border px-2 py-1 rounded-1 text-sm border-0 outline-1 outline-gray outline focus:outline-blue'].join(' ')}
      />
    </div>
  );
};