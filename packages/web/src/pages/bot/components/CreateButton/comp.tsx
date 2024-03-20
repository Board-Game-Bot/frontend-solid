import { Button, Form, Input, Modal, Select, TextArea } from 'soku-ui';
import { CreateBotReq } from './requests';
import { useRequest, signal } from '@/utils';
import { GAME_OPTIONS, LANG_OPTIONS } from '@/pages/bot/components/CreateButton/constants';

interface Props {
  onOk?: () => void;
}

export const CreateButton = (props: Props) => {
  const createBotReq = useRequest(
    CreateBotReq,
    {
      onSuccess: () => {
        visible(false);
        props.onOk?.();
      },
    },
  );
  const visible = signal(false);
  const form = Form.useForm();

  return (
    <>
      <Button icon={<div class="i-mdi:plus-thick w-1em h-1em" />} onClick={() => visible(true)}>
        创建 Bot
      </Button>
      <Modal
        title={'新建 Bot'}
        height={'70vh'}
        visible={visible()}
        loading={createBotReq.loading()}
        onOk={() => form.submit()}
        onCancel={() => visible(false)}
      >
        <div class={'p5 text-start'}>
          <Form
            form={form}
            onSubmit={data => {
              createBotReq.run(data as any);
            }}
          >
            <Form.Item name={'name'}>
              <Input
                class={'mt-8'}
                name={'name'}
                title={'代码名字'}
                width={400}
              />
            </Form.Item>
            <Form.Item name={'langId'}>
              <Select
                class={'mt-8'}
                name={'langId'}
                title={'使用语言'}
                width={150}
                options={LANG_OPTIONS}
              />
            </Form.Item>
            <Form.Item name={'gameId'}>
              <Select
                class={'mt-8'}
                name={'gameId'}
                title={'所属游戏'}
                width={150}
                options={GAME_OPTIONS}
              />
            </Form.Item>
            <Form.Item name={'description'}>
              <TextArea
                class={'mt-8'}
                name={'description'}
                title={'描述'}
                width={400}
              />
            </Form.Item>
            <Form.Item name={'code'}>
              <TextArea
                class={'mt-8'}
                name={'code'}
                title={'代码'}
                width={400}
              />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};