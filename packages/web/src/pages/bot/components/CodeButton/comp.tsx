import { createEffect, Show } from 'solid-js';
import { HighlightCode, IconButton, Modal, RegisteredLang } from 'soku-ui';
import { CodeBotReq } from './requests';
import { signal, useRequest } from '@/utils';
import { Bot } from '@/types';

interface Props {
  bot: Bot;
}

export const CodeButton = (props: Props) => {
  const visible = signal(false);

  const codeBotReq = useRequest(CodeBotReq);

  createEffect(
    () => {
      const v = visible();
      if (v && !codeBotReq.data())
        codeBotReq.run(props.bot.id);
    },
  );

  return (
    <>
      <IconButton icon={<div class="i-mdi:code w-2em h-2em" />} onClick={() => visible(true)} />
      <Modal
        title={`${props.bot.name} 的代码`}
        height={'70vh'}
        width={'800px'}
        visible={visible()}
        onOk={() => visible(false)}
        onCancel={() => visible(false)}
      >
        <Show
          when={!codeBotReq.loading() && codeBotReq.data()}
          fallback={<h1>加载中...</h1>}
        >
          <HighlightCode lang={props.bot.langId as RegisteredLang}>
            {codeBotReq.data()?.code}
          </HighlightCode>
        </Show>
      </Modal>
    </>
  );
};