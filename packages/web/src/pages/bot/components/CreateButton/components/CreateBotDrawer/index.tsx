import { Drawer, DrawerProps, Input, Message, NewForm, Select, TextArea } from '@soku-solid/ui';
import { useSignal } from '@soku-solid/utils';
import { Show } from 'solid-js';
import { GAME_OPTIONS, LANG_OPTIONS } from '../../constants';
import { CreateBotReq } from '../../requests';
import { useRequest } from '@/utils';

interface Props extends DrawerProps {
}

export const CreateBotDrawer = (props: Props) => {
  const [form] = NewForm.useForm();
  const visible = useSignal(false);

  const error = useSignal('');

  const createBotReq = useRequest(
    CreateBotReq,
    {
      onSuccess: () => {
        visible.s(false);
        props.onOk?.();
      },
      onError: (err) => {
        error.s(err);
      },
    },
  );

  const handleOk = () => {
    const values = form.gets();
    createBotReq.run(values as any);
  };

  return (
    <Drawer
      title={'创建你的 BOT'}
      {...props}
      onOk={handleOk}
      loading={createBotReq.loading()}
    >
      <div class={'box-border px10 py5'}>
        <NewForm form={form}>
          <NewForm.Item
            label={'名称'}
            field={'name'}
            component={Input}
            placeholder={'请输入此代码的名称'}
          />
          <NewForm.Item
            label={'语言'}
            field={'langId'}
            component={Select}
            options={LANG_OPTIONS}
            width={'200px'}
          />
          <NewForm.Item
            label={'游戏'}
            field={'gameId'}
            component={Select}
            options={GAME_OPTIONS}
            width={'200px'}
          />
          <NewForm.Item
            label={'描述'}
            field={'description'}
            component={TextArea}
            width={'100%'}
          />
          <NewForm.Item
            label={'代码'}
            field={'code'}
            component={TextArea}
            width={'100%'}
          />
        </NewForm>
        <Show when={error.v()}>
          <div class={'mt-8 w-full box-border'}>
            <Message title={'编译错误'}>
              <pre class={'w-full break-all text-12px font-400'} style={{ 'white-space': 'pre-wrap' }}>
                {error.v()}
              </pre>
            </Message>
          </div>
        </Show>
      </div>
    </Drawer>
  );
};
