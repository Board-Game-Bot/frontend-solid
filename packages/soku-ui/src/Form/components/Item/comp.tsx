import { ParentProps } from 'solid-js';

interface Props extends ParentProps {
  name?: string;
  onChange?: (value: any) => void;
}

export const Item = (props: Props) => {
  let divRef: HTMLDivElement;

  const handleChange = (e: Event | CustomEvent) => {
    if (e.target === divRef) return ;
    e.stopPropagation();
    const {
      onChange = (value: any) => {
        divRef.dispatchEvent(new CustomEvent('change', {
          bubbles: true,
          detail: {
            [props.name ?? '--unknown-field']: value,
          },
        }));
      },
    } = props;
    if (e instanceof CustomEvent) {
      onChange(e.detail);
    }
    else {
      onChange((e.target as any)?.value);
    }
  };

  return (
    <div
      ref={el => divRef = el}
      onChange={handleChange}
    >
      {props.children}
    </div>
  );
};
