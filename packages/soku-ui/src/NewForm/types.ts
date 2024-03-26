import { Accessor } from 'solid-js';

export interface FormInstance {
    set: (field: string, value: any) => void;
    get: (field: string) => any;
    delete: (field: string) => void;
    gets: () => Record<string, any>;
    watch: (field: string) => Accessor<any>;
}

export interface ContextType {
    form: FormInstance;
}
