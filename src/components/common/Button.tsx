interface Props {
  content?: string;
  onClick?: () => void;
  class?: string;
  disabled?: boolean;
}

export default function Button(props: Props) {
  function handleClick() {
    props.onClick && props.onClick();
  }

  return (
    <button
      class={`relative border-0 rounded-md px-3 py-1 box-border cursor-pointer
      ${props.class} 
      ${
        props.disabled &&
        'after:content-empty after:w-full after:h-full after:absolute after:left-0 after:top-0 after:bg-white after:opacity-50'
      }`}
      onClick={handleClick}
      disabled={props.disabled}
    >
      {props.content || 'button'}
    </button>
  );
}
