import { Accessor, createMemo, createSignal } from 'solid-js';
import { FormInstance } from '../types';
import { NewForm } from '..';

export type UseWatch<T> = (field: string, formInstance?: FormInstance) => Accessor<T>

export const useWatch: UseWatch<any> = <T>(field: string, formInstance?: FormInstance) => {
  const { form } = NewForm.useContext() ?? {};
  const [signal] = createSignal<T>();

  const watchSignal = createMemo<T>(() => {
    if (formInstance)
      return formInstance.watch(field)();
    return form?.watch(field)() ?? signal();
  });

  return watchSignal;
};