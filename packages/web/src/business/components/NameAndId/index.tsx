import { CopiableText } from '@soku-solid/ui';

interface Props {
    id: string;
    name: string;
}

export const NameAndId = (props: Props) => {
  return (
    <div>
      <div class={'flex items-center gap-2'}>
        {props.name}
      </div>
      <CopiableText text={props.id} class={'font-mono text-12px text-gray'}/>
    </div>
  );
};