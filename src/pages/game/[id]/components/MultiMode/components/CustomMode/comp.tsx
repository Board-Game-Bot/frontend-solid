import { Show } from 'solid-js';
import { jwt } from '@/store';

export const CustomMode = () => {
  return (
    <Show
      when={jwt()}
      fallback={
        <h1>你还未登陆，请先登陆！</h1>
      }
    >
      <h1>自定义模式，<span class={'text-blue-9'}>敬请期待！</span></h1>
    </Show>
  );
};