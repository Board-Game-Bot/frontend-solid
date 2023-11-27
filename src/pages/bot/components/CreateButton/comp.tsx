import { CreateBotReq } from './requests';
import { Button, Form, Input, Modal, Select, TextArea } from '@/components';
import { useRequest, signal } from '@/utils';

export const CreateButton = () => {
  const createBotReq = useRequest(
    CreateBotReq,
    {
      onSuccess: () => {
        visible(false);
      },
    },
  );
  const visible = signal(false);
  const form = Form.useForm();

  return (
    <>
      <Button variant={'success'} onClick={() => visible(true)}>
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
            onChange={data => console.log(data)}
            form={form}
            onSubmit={data => {
              console.log(data);
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
                options={{
                  'c++': 'C++',
                  'python': 'Python',
                  'java': 'Java',
                  'go': 'Go',
                }}
              />
            </Form.Item>
            <Form.Item name={'gameId'}>
              <Select
                class={'mt-8'}
                name={'gameId'}
                title={'所属游戏'}
                width={150}
                options={{
                  snake: 'Snake',
                  reversi: 'Reversi',
                  backgammon: 'Backgammon',
                }}
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