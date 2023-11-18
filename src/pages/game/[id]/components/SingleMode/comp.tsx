import { useNavigate, useParams } from '@solidjs/router';
import { Button } from '@/components';

export const SingleMode = () => {
  const navigate = useNavigate();
  const gameId = useParams().id;

  return (
    <Button
      variant={'primary'}
      class={'mt-8 m-auto text-xl px-8 py-1 shadow-md'}
      onClick={() => navigate(`/game/${gameId}/play`)}
    >
      开始游戏
    </Button>
  );
};
