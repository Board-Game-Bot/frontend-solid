import { useContext } from 'solid-js';
import { FormContext } from '../context';

export const useFormContext = () => {
  return useContext(FormContext);
};