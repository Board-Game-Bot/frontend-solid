import { Column } from '@soku-solid/ui';
import { CodeButton, DeleteButton, OperateButton, StatusTag, UpdateButton } from '../components';
import { formatTime } from '@/utils';
import { GameName, NameAndId, OnlyICan } from '@/business/components';
import { LANG_ICON_MAP } from '@/constants';
import { Bot } from '@/api/entity';

interface Props {
  onOk?: () => void;
}

export const useColumns = ({ onOk }: Props) => {
  const columns: Column<Bot>[] = [
    { width: '240px', sticky: 'left', index: 'Id', title: '名称/ID', render: (bot) => {
      return (
        <NameAndId id={bot.Id} name={bot.Name} />
      );
    } },
    { width: '100px', index: 'GameId', title: '游戏', render: (bot) => {
      return (
        <GameName name={bot.GameId} />
      );
    } },
    { width: '120px', index: 'Status', title: '状态', render: (bot) => <StatusTag status={bot.Status} message={bot.StatusMessage}/> },
    { width: '400px', index: 'Description', title: '描述', render: (record) => <div class={'p3 max-h-7 overflow-y-auto'}>{record.Description}</div> },
    { width: '50px', index: 'Lang', title: '语言', render: (bot) => {
      return (
        <div class={'text-2xl flex items-center gap-2'}>
          {LANG_ICON_MAP[bot.Lang]?.()}
        </div>
      );
    } },
    { width: '240px', title: '创建时间', render: (bot) =>
      <div class={'flex items-center font-mono'}>
        {formatTime(bot.CreateTime)}
      </div>,
    },
    { sticky: 'right', width: '120px', title: '操作', index: 'Status', render: (bot) =>
      <div class={'flex gap-1 relative -z-1'}>
        <CodeButton bot={bot} />
        <OnlyICan userId={bot.UserId}>
          <OperateButton bot={bot} onOperate={onOk} />
          <UpdateButton onOk={onOk} bot={bot} />
          <DeleteButton onOk={onOk} id={bot.Id} />
        </OnlyICan>
      </div>,
    },
  ];

  return columns;
};