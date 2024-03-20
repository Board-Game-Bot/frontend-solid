import { JSX } from 'solid-js';

interface Props extends JSX.ImgHTMLAttributes<HTMLImageElement> {
  emptyText?: string;
  shape?: 'circle';
}

export const Img = (props: Props) => {
  return <>{props.src ?
    <img {...props} class={[props.class, props.shape === 'circle' ? 'rounded-999' : '', 'w10 h10'].join(' ')} />
    : 
    <div class={['center text-xl text-white font-bold bg-amber w10 h10 select-none', props.shape === 'circle' ? 'rounded-999' : ''].join(' ')}>
      {(props.emptyText ?? '?').split(' ').map(s => s[0]).join('')}
    </div>
  }</>;
};