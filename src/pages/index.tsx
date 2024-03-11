import styles from './index.module.scss';

const WelcomePage = () => {
  return (
    <div class={[styles.page, 'full center'].join(' ')}>
      <div class={'w-full pl-40'}>
        <h1 text-white text-20 w-full>
          欢迎进入 Board Game Bot！
        </h1>
        <h2 text-white text-10 w-full>
          一个<span class={'underline'}>棋牌游戏平台</span>， 亦是一个<span class={'underline'}>棋牌游戏机器人竞技平台</span>。
        </h2>
      </div>
    </div>
  );
};

export default WelcomePage;