import { splitProps, ValidComponent } from 'solid-js';
import { Dynamic, DynamicProps } from 'solid-js/web';
import { NewForm } from '../..';
import style from './index.module.scss';

type Props<C extends ValidComponent> = DynamicProps<C> & {
  field?: string;
  label?: string;
}

export function NewFormItem<T extends ValidComponent>(props: Props<T>) {
  const { form } = NewForm.useContext() ?? {};
  const [itemProps, componentProps] = splitProps(props, ['component', 'field', 'label']);

  const value = () => itemProps.field ? form?.get(itemProps.field) : undefined;

  const handleChange = (value: any) => {
    if (itemProps.field) {
      const currentValue = form?.get(itemProps.field);
      if (currentValue !== value) {
        form?.set(itemProps.field, value);
      }
    }
  };

  return (
    <div class={style.formItem}>
      {props.label ?
        <label class={style.label} for={props.field}>{props.label}</label>
        : null}
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <Dynamic
        component={itemProps.component}
        value={value()}
        onChange={handleChange}
        {...componentProps ?? {}}
      />
    </div>
  );
}
