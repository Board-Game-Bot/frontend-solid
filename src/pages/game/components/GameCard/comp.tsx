import { cx } from '@/utils';

interface Props {
  icon: string;
  name: string;
  loading: boolean;
  onClick?: (name: string) => void;
}

export const GameCard = (props: Props) => {
  const handleClick = () => {
    if (props.loading) return;
    props.onClick?.(props.name);
  };

  return (
    <div class={'w-1/3 box-border p2'}>
      <div
        class={cx(
          'bg-white text-black wfull h75px rounded-2 shadow-xl box-border p3',
          'transition duration-200',
          'hover:bg-blue hover:text-white',
          'flex items-center gap-2',
          props.loading ? 'cursor-not-allowed' : 'cursor-pointer',
        )}
        onClick={handleClick}
      >
        <div class={'w1/5 text-10 text-end'}>
          {props.icon}
        </div>
        <div class={'max-w-4/5 box-border pl-3 text-8 overflow-hidden'}>
          {props.name}
        </div>
      </div>
    </div>
  );
};