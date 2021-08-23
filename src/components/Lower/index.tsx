import React from 'react';
import { Result, Button, WingBlank, WhiteSpace } from 'antd-mobile';

import './index.scss';

function Lower() {
  return (
    <div>
      <Result
        img={
          <img
            style={{ width: 60 }}
            src={'https://gw.alipayobjects.com/zos/rmsportal/GIyMDJnuqmcqPLpHCSkj.svg'}
            alt="失败"
          />
        }
        title={<div style={{ marginTop: 32 }}>APP 版本过低</div>}
        message={
          <div style={{ fontSize: 15, margin: '16px 40px 10px 40px' }}>
            <div style={{ marginTop: 5 }}>1.请关注「南昌大学家园网」微信公众号</div>
            <div>2.回复「南大家园」获取新版本下载地址</div>
          </div>
        }
      />
    </div>
  );
}

export default Lower;
