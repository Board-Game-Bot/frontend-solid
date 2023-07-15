import { createSignal } from 'solid-js';

export function Counter(props: { class: string }) {
  const [count, setCount] = createSignal(0);

  return (
    <button {...props} onClick={() => setCount(count() * 2 + 1)}>
      count: {count()}
    </button>
  );
}
