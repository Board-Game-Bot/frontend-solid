import { JSX } from 'solid-js';

export type AutoCompleteOption = {
    label: JSX.Element;
    value: any;
} | string | number;