import { useNavigate, useParams } from '@solidjs/router';
import { Button } from '@/components';

export const SingleMode = () => {
  const navigate = useNavigate();
  const gameId = useParams().id;

  return (
    <Button
      variant={'primary'}
      class={'mt-8 m-a'}
      onClick={() => navigate(`/game/${gameId}/play`)}
    >
      开始游戏
    </Button>
  );
};
