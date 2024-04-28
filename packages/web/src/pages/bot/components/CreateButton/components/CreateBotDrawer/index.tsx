import { Drawer, DrawerProps, Input, NewForm, Select, TextArea } from '@soku-solid/ui';
import { createSignal } from 'solid-js';
import { GAME_OPTIONS, LANG_OPTIONS } from '../../constants';
import { useRequest } from '@/utils';
import { client } from '@/api';

interface Props extends DrawerProps {
}

export const CreateBotDrawer = (props: Props) => {
  const [form] = NewForm.useForm();
  const visible = createSignal(false);

  const createBotReq = useRequest(
    client.CreateBot,
    {
      onSuccess: () => {
        visible[1](false);
        props.onOk?.();
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
            field={'Name'}
            component={Input}
            width={'100%'}
            placeholder={'请输入此代码的名称'}
          />
          <NewForm.Item
            label={'语言'}
            field={'Lang'}
            component={Select}
            options={LANG_OPTIONS}
            width={'200px'}
          />
          <NewForm.Item
            label={'游戏'}
            field={'GameId'}
            component={Select}
            options={GAME_OPTIONS}
            width={'200px'}
          />
          <NewForm.Item
            label={'描述'}
            field={'Description'}
            component={TextArea}
            width={'100%'}
          />
          <NewForm.Item
            label={'代码'}
            field={'Code'}
            component={TextArea}
            width={'100%'}
          />
        </NewForm>
      </div>
    </Drawer>
  );
};
