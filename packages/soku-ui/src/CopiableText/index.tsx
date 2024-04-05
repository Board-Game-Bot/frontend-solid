import { ComponentProps, Show, splitProps } from 'solid-js';
import { cx, useSignal } from '@soku-solid/utils';

interface Props {
    text: string;
    class?: string;
    divProps?: ComponentProps<'div'>
}

export const CopiableText = (_props: Props) => {
  const [classProps, props] = splitProps(_props, ['class']);
  const show = useSignal(false);
  const hasCopied = useSignal(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(props.text);
    hasCopied.s(true);
  };

  return (
    <div class={cx('flex items-center gap-1', classProps.class)} {...props.divProps} onMouseEnter={() => show.s(true)} onMouseLeave={() => show.s(false)}>
      <span>{props.text}</span>
      <Show when={show.v()} fallback={<div class={'w1em h1em'} />}>
        <Show
          when={hasCopied.v()}
          fallback={
            <div class="i-mdi:content-copy w-1em h-1em cursor-pointer" onClick={handleCopy}/>
          }
        >
          <div class="i-mdi:check-circle-outline w-1em h-1em cursor-pointer text-green" onClick={handleCopy} />
        </Show>
      </Show>
    </div>
  );
};