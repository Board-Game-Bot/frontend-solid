import { onMount, ParentProps } from 'solid-js';
import { render } from 'solid-js/web';
import { useAlert } from '@/components/Alert/utils';

interface Props extends ParentProps {
}

export const Alert = (props: Props) => {
  const root = document.getElementById('alert')!;

  root.innerHTML = '';

  render(
    () => <AlertComp {...props} />,
    root,
  );
};

const AlertComp = (props: Props) => {
  const [visible, toggle] = useAlert();
  onMount(() => setTimeout(toggle, 16));

  return (
    <div class={['transition-all duration-200 fixed top-100px right-100px bg-blue-7 text-white text-sm max-w-500px rounded-2 p-5', !visible() ? 'opacity-0' : 'opacity-100'].join(' ')}>
      {props.children}
    </div>
  );
};

