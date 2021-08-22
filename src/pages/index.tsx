import React from 'react';
import { WhiteSpace, Radio, Picker, DatePicker, List, InputItem, Button, WingBlank, Modal } from 'antd-mobile';
import { data as placeData } from '@/utils/third-level-address';
import { vehiclesData, destinationsData, campusData, promiseData } from '@/utils/data';
import { useSafeArea } from 'mincu-react';
import { getCalcTime } from '@/utils/common';
import store from '@/store';

const now = new Date(Date.now());

/**
 * 建议使用真机调试
 */
const App = () => {
  const [state, userDispatchers] = store.useModel('common');
  const { reachDate, reachStartTime, reachEndTime } = state;
  const { origin, destination } = state;
  const { vehicleType, vehicleInfo, transit, vehicleArrivalTime } = state;
  const { campus } = state;
  const { setData, submit } = userDispatchers;

  const [visible, setVisible] = React.useState(false);

  const { bottom } = useSafeArea();

  // 协议
  const renderModal = () => {
    return (
      <Modal
        visible={visible}
        transparent
        maskClosable={false}
        onClose={() => setVisible(false)}
        title="学生返校承诺书"
        footer={[
          {
            text: '取消',
            onPress: () => {
              setVisible(false);
            },
          },
          {
            text: '同意并提交',
            onPress: () => {
              submit();
              setVisible(false);
            },
          },
        ]}
      >
        <div style={{ height: '32vh', overflow: 'scroll' }}>{promiseData}</div>
      </Modal>
    );
  };

  return (
    <>
      <List renderHeader={() => '返校时间'} renderFooter={() => '时间段最长为五个小时'}>
        <DatePicker mode="date" value={reachDate} onChange={(e: any) => setData({ reachDate: e })} minDate={now}>
          <List.Item arrow="horizontal">返校日期</List.Item>
        </DatePicker>
        <DatePicker
          mode="time"
          value={reachStartTime}
          onChange={(e: any) => setData({ reachStartTime: e })}
          minDate={getCalcTime(reachEndTime, 'subtract', 5, 'hours')}
          maxDate={reachEndTime}
        >
          <List.Item arrow="horizontal">开始时间</List.Item>
        </DatePicker>
        <DatePicker
          mode="time"
          value={reachEndTime}
          onChange={(e: any) => setData({ reachEndTime: e })}
          minDate={reachStartTime}
          maxDate={getCalcTime(reachStartTime, 'add', 5, 'hours')}
        >
          <List.Item arrow="horizontal">结束时间</List.Item>
        </DatePicker>
      </List>

      <List renderHeader={() => '基本信息'}>
        <Picker extra="请选择" data={placeData} value={origin} onChange={(e: any) => setData({ placeData: e })}>
          <List.Item arrow="horizontal">始发地</List.Item>
        </Picker>
        <Picker
          extra="请选择"
          data={destinationsData}
          cols={1}
          value={destination}
          onChange={(e: any) => setData({ destinationsData: e })}
        >
          <List.Item arrow="horizontal">目的地</List.Item>
        </Picker>
      </List>

      <List
        renderHeader={() => '交通信息'}
        renderFooter={() => '没有确切车辆信息，请填写大概出发时间。如自驾，请填写交通工具信息中填写自带车牌照'}
      >
        <Picker
          extra="请选择"
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
        <DatePicker value={vehicleArrivalTime} onChange={(e: any) => setData({ vehicleArrivalTime: e })} minDate={now}>
          <List.Item arrow="horizontal">交通工具到达时间</List.Item>
        </DatePicker>
      </List>
      <WhiteSpace />

      <List renderHeader={() => '选择校区'}>
        {campusData.map((i) => (
          <Radio.RadioItem key={i.value} checked={campus === i.value} onChange={() => setData({ campus: i.value })}>
            {i.label}
          </Radio.RadioItem>
        ))}
      </List>

      <WhiteSpace size="lg" />
      <WhiteSpace size="lg" />
      <WingBlank>
        <Button type="primary" onClick={() => setVisible(true)}>
          提交
        </Button>
      </WingBlank>
      <div style={{ height: bottom + 30 }} />
      {renderModal()}
    </>
  );
};

export default App;
