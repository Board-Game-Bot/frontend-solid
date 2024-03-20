import dayjs from 'dayjs';
import { Form, IconButton, Input, Modal, Select, TextArea } from 'soku-ui';
import { UpdateBotReq } from './requests';
import { useRequest, signal } from '@/utils';
import { Bot } from '@/types';

interface Props {
  record: Bot;
  onOk?: () => void;
}

export const UpdateButton = (props: Props) => {
  const updateBotReq = useRequest(
    UpdateBotReq,
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
      <IconButton icon={<div class="i-mdi:settings w-2em h-2em" />} onClick={() => visible(true)} />
      <Modal
        title={`修改 ${props.record.id}`}
        height={'70vh'}
        visible={visible()}
        loading={updateBotReq.loading()}
        onOk={() => form.submit()}
        onCancel={() => visible(false)}
      >
        <div class={'p5'}>
          <Form
            form={form}
            onSubmit={(data: any) => updateBotReq.run(data)}
          >
            <Form.Item
              name={'id'}
            >
              <Input
                title={'The Bot ID'}
                width={400}
                disabled
                default={props.record.id}
              />
            </Form.Item>
            <Form.Item
              name={'name'}
            >
              <Input
                class={'mt-8'}
                title={'代码名字'}
                width={400}
                default={props.record.name}
              />
            </Form.Item>
            <Form.Item
              name={'langId'}
            >
              <Select
                class={'mt-8'}
                title={'使用语言'}
                width={150}
                options={{
                  'c++': 'C++',
                  'python': 'Python',
                  'java': 'Java',
                  'go': 'Go',
                }}
                default={props.record.langId}
              />
            </Form.Item>
            <Form.Item
              name={'gameId'}
            >
              <Select
                class={'mt-8'}
                title={'所属游戏'}
                width={150}
                options={{
                  snake: 'Snake',
                  reversi: 'Reversi',
                  backgammon: 'Backgammon',
                }}
                default={props.record.gameId}
              />
            </Form.Item>
            <Form.Item
              name={'description'}
            >
              <TextArea
                class={'mt-8'}
                title={'描述'}
                width={400}
                default={props.record.description}
              />
            </Form.Item>
            <Form.Item
              name={'createTime'}
            >
              <Input
                class={'mt-8'}
                title={'创建时间'}
                disabled
                width={400}
                default={dayjs(props.record.createTime).format('YYYY-MM-DD HH:mm')}
              />
            </Form.Item>
            <Form.Item
              name={'code'}
            >
              <TextArea
                class={'mt-8'}
                title={'代码'}
                width={400}
                default={props.record.code}
              />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};