import { get, set } from 'lodash-es';
import { createSignal } from 'solid-js';
import { FormInstance } from '../types';

export const useForm = () => {
  const formValue = createSignal<Record<string, any>>({});
  const form: FormInstance = {
    set: (field, value) => {
      const currentFormValue = formValue[0]();
      set(currentFormValue!, field, value);
      formValue[1]({ ...currentFormValue });
    },
    get: (field) => {
      return get(formValue[0](), field);
    },
    gets: () => {
      return formValue[0]()!;
    },
    delete: (field) => {
      const currentFormValue = formValue[0]()!;
      delete currentFormValue[field];
      formValue[1]({ ...currentFormValue });
    },
    watch: (field) => {
      return () => get(formValue[0](), field);
    },
  };

  return [form];
};