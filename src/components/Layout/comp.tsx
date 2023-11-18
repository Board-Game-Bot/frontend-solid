import { ParentProps } from 'solid-js';

interface Props extends ParentProps {}

export function Layout(props: Props) {
  return (
    <div class={'m-auto w-1200px h-auto'}>
      {props.children}
    </div>
  );
}
