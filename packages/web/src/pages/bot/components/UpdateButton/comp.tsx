import dayjs from 'dayjs';
import { Drawer, IconButton, Input, NewForm, TextArea } from '@soku-solid/ui';
import { createSignal } from 'solid-js';
import { useRequest } from '@/utils';
import { client } from '@/api';
import { UpdateBotRequest } from '@/api/dtos';
import { Bot } from '@/api/entity';

interface Props {
  bot: Bot;
  onOk?: () => void;
}

export const UpdateButton = (props: Props) => {
  const visible = createSignal(false);
  const [bot, setBot] = createSignal(props.bot);

  const updateBotReq = useRequest(
    client.UpdateBot,
    {
      onSuccess: () => {
        visible[1](false);
        props.onOk?.();
      },
    },
  );
  const [form] = NewForm.useForm();

  const handleSubmit = () => {
    const values = form.gets();
    updateBotReq.run({ Id: bot().Id, ...values } as UpdateBotRequest);
  };

  const handleToUpdate = async () => {
    const bot = await client.GetBot({ Id: props.bot.Id });
    setBot(bot);
    visible[1](true);
  };

  return (
    <>
      <IconButton icon={<div class="i-mdi:settings w-1em h-1em" />} onClick={handleToUpdate} />
      <Drawer
        title={`修改 ${bot().Id}`}
        visible={visible[0]()}
        loading={updateBotReq.loading()}
        onOk={handleSubmit}
        onCancel={() => visible[1](false)}
      >
        <div class={'p5'}>
          <NewForm form={form}>
            <NewForm.Item
              label={'ID'}
              field={'Id'}
              component={Input}
              width={'100%'}
              value={bot().Id}
              default={bot().Id}
              disabled
            />
            <NewForm.Item
              label={'名称'}
              field={'Name'}
              component={Input}
              width={'100%'}
              value={bot().Name}
              default={bot().Name}
            />
            <NewForm.Item
              label={'语言'}
              field={'Lang'}
              component={Input}
              disabled
              value={bot().Lang}
              default={bot().Lang}
              width={'100%'}
            />
            <NewForm.Item
              label={'游戏'}
              field={'GameId'}
              component={Input}
              disabled
              value={bot().GameId}
              default={bot().GameId}
              width={'100%'}
            />
            <NewForm.Item
              label={'描述'}
              field={'Description'}
              component={TextArea}
              default={bot().Description}
              width={'100%'}
            />
            <NewForm.Item
              label={'创建时间'}
              field={'CreateTime'}
              width={'100%'}
              component={Input}
              disabled
              value={dayjs(bot().CreateTime).format('YYYY-MM-DD HH:mm')}
            />
            <NewForm.Item
              label={'代码'}
              field={'Code'}
              component={TextArea}
              value={bot().Code}
              default={bot().Code}
              width={'100%'}
            />
          </NewForm>
        </div>
      </Drawer>
    </>
  );
};