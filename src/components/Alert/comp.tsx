import { onMount, ParentProps } from 'solid-js';
import { render } from 'solid-js/web';
import { useAlert } from '@/components/Alert/utils';
import { cx } from '@/utils';

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
    <div
      class={cx(
        'transition-all duration-200',
        'fixed top-100px right-100px',
        'bg-#7777 border-#999 border-1 border-solid',
        ' text-#444 text-sm max-w-500px rounded-2 p-5',
        { ['opacity-0']: !visible(), ['opacity-100']: visible() },
      )}
    >
      {props.children}
    </div>
  );
};

