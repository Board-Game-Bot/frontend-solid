import { JSX } from 'solid-js';

interface Props extends Omit<JSX.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  onSubmit?: (data: Record<string, any>) => void;
}

export const Form = (props: Props) => {
  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data: Record<string, any> = {};
    for (const [k, v] of formData.entries())
      data[k] = v;

    props.onSubmit?.(data);
  };

  return (
    <form {...props} onSubmit={handleSubmit} />
  );
};