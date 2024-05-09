import { Participant } from '@/pages/game/types';

interface Props {
    audience: Participant;
}

export const AudienceCard = (props: Props) => {
  return (
    <div class={'flex items-center gap-3 h-75px p-10px border-1 border-#ccc border-solid rounded-md'}>
      <img class={'w50px h50px rounded-full flex-0'} src={props.audience.User.Avatar} alt={'avatar'}/>
      <div class={'flex-1'}>
        <div class={'text-lg'}>{props.audience.User.Name}</div>
        <div class={'text-gray text-md'}>{props.audience.User.Id}</div>
      </div>
    </div>
  );
};