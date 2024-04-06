import { createEffect, Show, untrack } from 'solid-js';
import { HighlightCode, IconButton, Modal } from '@soku-solid/ui';
import { useSignal } from '@soku-solid/utils';
import { CodeBotReq } from './requests';
import { useRequest } from '@/utils';
import { Bot } from '@/types';

interface Props {
  bot: Bot;
}

export const CodeButton = (props: Props) => {
  const bot = untrack(() => props.bot);
  const visible = useSignal(false);

  const codeBotReq = useRequest(CodeBotReq);

  createEffect(
    () => {
      const v = visible.v();
      if (v && !codeBotReq.data())
        codeBotReq.run(bot.id);
    },
  );

  return (
    <>
      <IconButton icon={<div class="i-mdi:code w-1em h-1em" />} onClick={() => visible.s(true)} />
      <Modal
        title={`${bot.name} 的代码`}
        height={'70vh'}
        width={'800px'}
        visible={visible.v()}
        onOk={() => visible.s(false)}
        onCancel={() => visible.s(false)}
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