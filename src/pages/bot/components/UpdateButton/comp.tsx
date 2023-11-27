import dayjs from 'dayjs';
import { UpdateBotReq } from './requests';
import { Button, Form, Input, Modal, Select, TextArea } from '@/components';
import { useRequest, signal } from '@/utils';
import { Bot } from '@/types';

interface Props {
  record: Bot;
}

export const UpdateButton = (props: Props) => {
  const updateBotReq = useRequest(
    UpdateBotReq,
    {
      onSuccess: () => {
        visible(false);
      },
    },
  );
  const visible = signal(false);

  return (
    <>
      <Button onClick={() => visible(true)}>
        修改
      </Button>
      <Modal
        title={`修改 ${props.record.id}`}
        height={'70vh'}
        visible={visible()}
        loading={updateBotReq.loading()}
        onOk={() => updateBotReq.run(props.record)}
        onCancel={() => visible(false)}
      >
        <div class={'p5'}>
          <Form>
            <Input
              name={'id'}
              title={'The Bot ID'}
              width={400}
              disabled
              default={props.record.id}
            />
            <Input
              class={'mt-8'}
              name={'name'}
              title={'代码名字'}
              width={400}
              default={props.record.name}
            />
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
              default={props.record.langId}
            />
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
              default={props.record.gameId}
            />
            <TextArea
              class={'mt-8'}
              name={'description'}
              title={'描述'}
              width={400}
              default={props.record.description}
            />
            <Input
              class={'mt-8'}
              name={'createTime'}
              title={'创建时间'}
              disabled
              width={400}
              default={dayjs(props.record.createTime).format('YYYY-MM-DD HH:mm')}
            />
            <TextArea
              class={'mt-8'}
              name={'code'}
              title={'代码'}
              width={400}
              default={props.record.code}
            />
          </Form>
        </div>
      </Modal>
    </>
  );
};