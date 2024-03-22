import { get, set } from 'lodash-es';
import { useSignal } from 'soku-utils';
import { FormInstance } from '../types';

export const useForm = () => {
  const formValue = useSignal<Record<string, any>>({});
  const form: FormInstance = {
    set: (field, value) => {
      const currentFormValue = formValue.v();
      set(currentFormValue!, field, value);
      formValue.s({ ...currentFormValue });
    },
    get: (field) => {
      return get(formValue.v(), field);
    },
    gets: () => {
      return formValue.v()!;
    },
    delete: (field) => {
      const currentFormValue = formValue.v()!;
      delete currentFormValue[field];
      formValue.s({ ...currentFormValue });
    },
    watch: (field) => {
      return () => get(formValue.v(), field);
    },
  };

  return [form];
};