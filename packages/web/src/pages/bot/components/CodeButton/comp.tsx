import { createEffect, createSignal, Show, untrack } from 'solid-js';
import { HighlightCode, IconButton, Modal } from '@soku-solid/ui';
import { CodeBotReq } from './requests';
import { useRequest } from '@/utils';
import { Bot } from '@/types';

interface Props {
  bot: Bot;
}

export const CodeButton = (props: Props) => {
  const bot = untrack(() => props.bot);
  const visible = createSignal(false);

  const codeBotReq = useRequest(CodeBotReq);

  createEffect(
    () => {
      const v = visible[0]();
      if (v && !codeBotReq.data())
        codeBotReq.run(bot.id);
    },
  );

  return (
    <>
      <IconButton icon={<div class="i-mdi:code w-1em h-1em" />} onClick={() => visible[1](true)} />
      <Modal
        title={`${bot.name} 的代码`}
        height={'70vh'}
        width={'800px'}
        visible={visible[0]()}
        onOk={() => visible[1](false)}
        onCancel={() => visible[1](false)}
      >
        <Show
          when={!codeBotReq.loading() && codeBotReq.data()}
          fallback={<h1>加载中...</h1>}
        >
          <HighlightCode lang={bot.langId}>
            {codeBotReq.data()?.code}
          </HighlightCode>
        </Show>
      </Modal>
    </>
  );
};