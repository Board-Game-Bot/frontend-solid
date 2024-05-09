import { capitalize } from 'lodash-es';
import { Participant } from '@/pages/game/types';
import { Rate } from '@/api/entity';

interface Props {
    gameId?: string;
    player: Participant;
    rate?: Rate;
}

export const PlayerCard = (props: Props) => {
  return (
    <div class={'h-full w-300px flex flex-col gap-3 items-center rounded-md border-#ccc border-solid border-1 p-20px text-24px'} classList={{ 'bg-green': props.player.IsReady }}>
      <img src={props.player.User.Avatar} class={'rounded-full w-150px'} />
      <div> {props.player.User.Name} </div>
      <div>With {props.player.Bot?.Name ?? 'No'} Bot</div>
      <div>The Score in {capitalize(props.gameId)}</div>
      <div>{props.rate?.Score}</div>
      <div>The Rank in {capitalize(props.gameId)}</div>
      <div>{props.rate?.Rank}</div>
    </div>
  );
};