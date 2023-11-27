import { JSX, onMount } from 'solid-js';
import { useForm } from './utils';
import { FormInstance } from './types';
import { Item } from './components';
import { signal } from '@/utils';

interface Props extends Omit<JSX.FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'onChange'> {
  onSubmit?: (data: Record<string, any>) => void;
  onChange?: (data: any) => void;
  form?: FormInstance;
}

const Form = (props: Props) => {
  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data: Record<string, any> = {};
    for (const [k, v] of formData.entries())
      data[k] = v;

    props.onSubmit?.(data);
  };

  const data = signal<Record<string, any>>({});
  onMount(() => {
    if (props.form)
      Object.assign(props.form, {
        submit: () => {
          props.onSubmit?.(data());
        },
      });
  });

  const handleChange = (e: Event) => {
    if (e instanceof CustomEvent) {
      props.onChange?.(e.detail);
      Object.assign(data(), e.detail);
    }
  };

  return (
    <form
      {...props}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

Form.useForm = useForm;
Form.Item = Item;

export {
  Form,
};