interface Props {
  children?: any;
}
export default function SideBar(props: Props) {
  return <div class="full shadow-xl bg-gray-100">{props.children}</div>;
}
