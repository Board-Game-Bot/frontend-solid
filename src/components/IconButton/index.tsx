import { JSX } from 'solid-js';
import { Button, ButtonProps } from '@/components';

interface Props extends ButtonProps {
  icon: JSX.Element;
}

export const IconButton = (props: Props) => {
  return (
    <Button {...props} style={{ padding: '5px' }}>
      {props.icon}
    </Button>
  );
};