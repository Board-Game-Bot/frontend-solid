interface Props {
  children?: any;
}

export default function ContentBox(props: Props) {
  return <div class="max-w-[1000px] m-auto">{props.children}</div>;
}
