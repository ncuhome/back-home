import React from 'react';
import { DatePicker, List, Picker, InputItem } from 'antd-mobile';
import { vehiclesData } from '@/utils/data';
import store from '@/store';

const now = new Date(Date.now());

function Transport() {
  const [state, userDispatchers] = store.useModel('common');
  const { vehicleType, vehicleInfo, transit, vehicleArrivalTime } = state;
  const { setData } = userDispatchers;

  return (
    <List
      renderHeader={() => '🚗 交通信息'}
      renderFooter={() => '没有确切车辆信息，请填写大概出发时间。如自驾，请填写交通工具信息中填写自带车牌照'}
    >
      <Picker
        extra="请选择"
        title={'交通工具'}
        data={vehiclesData}
        value={vehicleType}
        cols={1}
        onChange={(e: any) => setData({ vehicleType: e })}
      >
        <List.Item arrow="horizontal">交通工具</List.Item>
      </Picker>
      <InputItem
        clear
        placeholder="例：G100-02-16F"
        defaultValue={vehicleInfo}
        onChange={(e: any) => setData({ vehicleInfo: e })}
      >
        详细信息
      </InputItem>
      <InputItem
        clear
        placeholder="如果无中转站，请忽略"
        defaultValue={transit}
        onChange={(e: any) => setData({ transit: e })}
      >
        中转地点
      </InputItem>
      <DatePicker
        value={vehicleArrivalTime}
        title={'交通工具到达时间'}
        onChange={(e: any) => setData({ vehicleArrivalTime: e })}
        minDate={now}
      >
        <List.Item arrow="horizontal">交通工具到达时间</List.Item>
      </DatePicker>
    </List>
  );
}

export default Transport;
