import { JSX } from 'solid-js';

export interface TagStatus {
    color: string;
    El: () => JSX.Element;
    text: string;
}