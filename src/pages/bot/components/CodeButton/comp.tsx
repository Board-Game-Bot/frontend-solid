import { createEffect, Show } from 'solid-js';
import { CodeBotReq } from './requests';
import { Button, Modal } from '@/components';
import { signal, useRequest } from '@/utils';

interface Props {
  id: string;
}

export const CodeButton = (props: Props) => {
  const visible = signal(false);

  const codeBotReq = useRequest(CodeBotReq);

  createEffect(
    () => {
      const v = visible();
      if (v && !codeBotReq.data())
        codeBotReq.run(props.id);
    },
  );

  return (
    <>
      <Button onClick={() => visible(true)}>
        查看
      </Button>
      <Modal
        title={`查看 ${props.id}`}
        height={'70vh'}
        visible={visible()}
        onOk={() => visible(false)}
        onCancel={() => visible(false)}
      >
        <Show
          when={!codeBotReq.loading() && codeBotReq.data()}
          fallback={<h1>加载中...</h1>}
        >
          <pre class={'font-mono'}>
            {codeBotReq.data()?.code}
          </pre>
        </Show>
      </Modal>
    </>
  );
};