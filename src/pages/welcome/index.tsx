import { createSignal, JSX, For } from 'solid-js';
import { faker } from '@faker-js/faker';

function Title(props: { title: string }) {
  return <h2 class="m-0">{props.title}</h2>;
}

function Content(props: { content: string }) {
  return <p class="text-2xl">{props.content}</p>;
}

export default function WelcomeView(): JSX.Element {
  const [instructions] = createSignal<[string, string][]>(
    Array(5)
      .fill(0)
      .map(() => [faker.lorem.words(4), faker.lorem.paragraphs()]),
  );

  return (
    <div class="px-10">
      <h1>Welcome View</h1>
      <For each={instructions()}>
        {([title, content]) => (
          <div class="mb-14">
            <Title title={title} />
            <Content content={content} />
          </div>
        )}
      </For>
    </div>
  );
}
