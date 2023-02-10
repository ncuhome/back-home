import React from 'react';
import ui from 'mincu-ui';
import dayjs from 'dayjs';
import { WhiteSpace, Button, WingBlank } from 'antd-mobile';
import store from '@/store';

import Header from '@/components/Header';
import Time from '@/components/Time';
import Basic from '@/components/Basic';
import Transport from '@/components/Transport';
import Campus from '@/components/Campus';
import Footer from '@/components/Footer';

import './index.scss';

/**
 * 建议使用真机调试
 */
const App = () => {
  const [state, userDispatchers] = store.useModel('common');
  const { submit } = userDispatchers;

  // 校验
  const onNext = () => {
    const optionals = ['transit'];
    const pass = Object.keys(state).every((i) => optionals.includes(i) || state[i]);
    const timeMinuteRange = dayjs(state.reachStartTime).diff(dayjs(state.reachEndTime), 'minute');

    if (!pass) {
      ui.fail('请将信息补充完整');
      return;
    }

    if (Math.abs(timeMinuteRange) > 5 * 60) {
      ui.fail('入校时间段需在五个小时以内');
      return;
    }

    submit();
  };

  return (
    <>
      {/* 状态指示栏 */}
      <>
        <WhiteSpace />
        <Header />
        <WhiteSpace />
      </>

      {/* 入校时间 */}
      <Time />

      {/* 基本信息 */}
      <Basic />
      <WhiteSpace />

      {/* 交通信息 */}
      <Transport />

      {/* 选择校区 */}
      <Campus />

      {/* 提交 */}
      <>
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />

        <WingBlank>
          <Button type="primary" style={{ background: '#1874ff' }} onClick={onNext}>
            提交
          </Button>
        </WingBlank>
      </>

      {/* LOGO */}
      <Footer />
    </>
  );
};

export default App;
