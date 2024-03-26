import { ParentProps } from 'solid-js';
import { FormInstance } from './types';
import { FormContext } from './context';
import { useForm, useFormContext, useWatch } from './hooks';
import { NewFormItem } from './components';

interface Props extends ParentProps {
    form: FormInstance;
}

export const NewForm = (props: Props) => {
  return (
    <FormContext.Provider value={{ form: props.form }}>{props.children}</FormContext.Provider>
  );
};

NewForm.useForm = useForm;
NewForm.useContext = useFormContext;
NewForm.useWatch = useWatch;
NewForm.Item = NewFormItem;
