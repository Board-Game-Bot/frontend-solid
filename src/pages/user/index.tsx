import { useParams } from '@solidjs/router';
import { ContentBox } from '@/components/common';

export default function UserView() {
  const { id } = useParams();
  return (
    <ContentBox>
      <h1>{id}</h1>
    </ContentBox>
  );
}
