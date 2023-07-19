interface Props {
  field: string;
  type?: string;
  label?: string;
  class?: string;
}

export default function Input(props: Props) {
  return (
    <div class={'mb-3 ' + props.class}>
      <label for={props.field} class="block m-0">
        {props.label || props.field}
      </label>
      <input
        id={props.field}
        class="block w-full box-border rounded-md px-2 outline-0 border-[1px] h-[30px]"
        name={props.field}
        type={props.type || 'text'}
      />
    </div>
  );
}
