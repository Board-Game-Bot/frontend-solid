import { createSignal, Show } from 'solid-js';
import { CustomMode, MatchMode } from './components';
import { RadioGroup } from '@/components';

export const MultiMode = () => {
  const [mode, setMode] = createSignal('match');
  const options = {
    'match': '匹配模式',
    'custom': '自定义模式',
  };

  return (
    <div class={''}>
      <RadioGroup onChange={setMode} class={'mt-10 m-auto'} items={options} />
      <Show when={mode() === 'match'}>
        <MatchMode />
      </Show>
      <Show when={mode() === 'custom'}>
        <CustomMode />
      </Show>
    </div>
  );
};
