import { ParentProps } from 'solid-js';

interface Props {
  visible: boolean;
  title: string;
  onClickOutside?: () => void;
}

export default function Modal(props: Props & ParentProps<any>) {
  let modalRef: HTMLDivElement;

  function handleClickOutside(e: MouseEvent) {
    if (e.target === modalRef) {
      props.onClickOutside && props.onClickOutside();
    }
  }

  return (
    <>
      {props.visible && (
        <div
          ref={(el) => (modalRef = el)}
          onClick={handleClickOutside}
          class="fixed left-0 top-0 w-screen h-screen bg-[rgba(0,0,0,.7)] flex justify-center items-center"
        >
          <div class="max-w-[80%] max-h-[80%] bg-slate-200 overflow-auto rounded-lg">
            <header class="text-white bg-slate-700 px-2 py-0 border-b-2 border-black">
              <h2 class="m-0 py-1 px-2">{props.title}</h2>
            </header>
            <main class="w-full max-h-[80vh]">{props.children}</main>
          </div>
        </div>
      )}
    </>
  );
}
