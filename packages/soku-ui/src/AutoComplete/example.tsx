import { range } from 'lodash-es';
import { AutoCompleteOption } from './types';
import { AutoComplete } from './index';

export const AutoCompleteExample = () => {
  const optionsFn = async (value: string): Promise<AutoCompleteOption[]> => {
    return new Promise<AutoCompleteOption[]>((resolve) => {
      setTimeout(() => {
        resolve(range(10).map((i: number) => value + i));
      }, 300);
    });
  };
  return (
    <AutoComplete width={'500px'} optionsFn={optionsFn} />
  );
};

