import { Component, ComponentProps, JSX, ParentProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { NewForm } from '../..';
import style from './index.module.scss';

interface Props<C extends Component<any>> extends ParentProps {
    field?: string;
    label?: string;
    
    component: C;
    props?: ComponentProps<C>;
}

export const NewFormItem: <T>(props: Props<Component<T>>) => JSX.Element = (props) => {
  const { form } = NewForm.useContext() ?? {};

  const value = () => props.field ? form?.get(props.field) : undefined;

  const handleChange = (value: any) => {
    if (props.field) {
      const currentValue = form?.get(props.field);
      if (currentValue !== value) {
        form?.set(props.field, value);
      }
    }
  };

  return (
    <div class={style.formItem}>
      {props.label ? 
        <label class={style.label} for={props.field}>{props.label}</label>
        : null}
      <Dynamic
        component={props.component}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        value={value()}
        onChange={handleChange}
        {...props.props ?? {}}
      />
    </div>
  );
};
