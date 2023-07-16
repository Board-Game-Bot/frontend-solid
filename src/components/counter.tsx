import { createSignal } from 'solid-js';

export default function Counter(props: { class: string }) {
  const [count, setCount] = createSignal(0);

  return (
    <button {...props} onClick={() => setCount(count() + 6)}>
      count: {count()}
    </button>
  );
}
