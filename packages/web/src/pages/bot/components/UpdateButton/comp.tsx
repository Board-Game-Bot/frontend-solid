import dayjs from 'dayjs';
import { Drawer, IconButton, Input, Message, NewForm, Select, TextArea } from '@soku-solid/ui';
import { createSignal, Show } from 'solid-js';
import { UpdateBotDto, UpdateBotReq } from './requests';
import { useRequest } from '@/utils';
import { Bot } from '@/types';
import { GAME_OPTIONS, LANG_OPTIONS } from '@/pages/bot/components/CreateButton/constants';

interface Props {
  bot: Bot;
  onOk?: () => void;
}

export const UpdateButton = (props: Props) => {
  const error = createSignal('');
  const visible = createSignal(false);

  const updateBotReq = useRequest(
    UpdateBotReq,
    {
      onSuccess: () => {
        visible[1](false);
        props.onOk?.();
      },
      onError: (errorMsg) => {
        error[1](errorMsg);
      },
    },
  );
  const [form] = NewForm.useForm();

  const handleSubmit = () => {
    const values = form.gets();
    updateBotReq.run(values as UpdateBotDto);
  };

  return (
    <>
      <IconButton icon={<div class="i-mdi:settings w-1em h-1em" />} onClick={() => visible[1](true)} />
      <Drawer
        title={`修改 ${props.bot.id}`}
        visible={visible[0]()}
        loading={updateBotReq.loading()}
        onOk={handleSubmit}
        onCancel={() => visible[1](false)}
      >
        <div class={'p5'}>
          <NewForm form={form}>
            <NewForm.Item
              label={'ID'}
              field={'id'}
              component={Input}
              width={'100%'}
              disabled
              default={props.bot.id}
            />
            <NewForm.Item
              label={'名称'}
              field={'name'}
              component={Input}
              width={'100%'}
              default={props.bot.name}
            />
            <NewForm.Item
              label={'语言'}
              field={'langId'}
              component={Select}
              options={LANG_OPTIONS}
              default={props.bot.langId}
              width={'100%'}
            />
            <NewForm.Item
              label={'游戏'}
              field={'gameId'}
              component={Select}
              options={GAME_OPTIONS}
              default={props.bot.gameId}
              width={'100%'}
            />
            <NewForm.Item
              label={'描述'}
              field={'description'}
              component={TextArea}
              default={props.bot.description}
              width={'100%'}
            />
            <NewForm.Item
              label={'创建时间'}
              field={'createTime'}
              width={'100%'}
              component={Input}
              disabled
              default={dayjs(props.bot.createTime).format('YYYY-MM-DD HH:mm')}
            />
            <NewForm.Item
              label={'代码'}
              field={'code'}
              component={TextArea}
              default={props.bot.code}
              width={'100%'}
            />
          </NewForm>
          <Show when={error[0]()}>
            <div class={'mt-8 w-full box-border'}>
              <Message title={'编译错误'}>
                <pre class={'w-full break-all text-12px font-400'} style={{ 'white-space': 'pre-wrap' }}>
                  {error[0]()}
                </pre>
              </Message>
            </div>
          </Show>
        </div>
      </Drawer>
    </>
  );
};