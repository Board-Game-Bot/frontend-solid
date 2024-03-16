import { createEffect, Show } from 'solid-js';
import { CodeBotReq } from './requests';
import { HighlightCode, IconButton, Modal } from '@/components';
import { signal, useRequest } from '@/utils';
import { RegisteredLang } from '@/components/HighlightCode/types';

interface Props {
  id: string;
  lang: RegisteredLang;
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
      <IconButton icon={<div class="i-mdi:code w-2em h-2em" />} onClick={() => visible(true)} />
      <Modal
        title={`${props.id} 的代码`}
        height={'70vh'}
        visible={visible()}
        onOk={() => visible(false)}
        onCancel={() => visible(false)}
      >
        <Show
          when={!codeBotReq.loading() && codeBotReq.data()}
          fallback={<h1>加载中...</h1>}
        >
          <HighlightCode lang={props.lang}>
            {codeBotReq.data()?.code}
          </HighlightCode>
        </Show>
      </Modal>
    </>
  );
};