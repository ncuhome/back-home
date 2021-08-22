import { campusData } from '@/utils/data';
import { getStatus } from '@/utils/common';
import network from 'mincu-network';
import ui from 'mincu-ui';

export default {
  state: {
    status: '加载中...',
    // 返校时间
    reachDate: undefined, // 返校日期 YYYY-MM-DD
    reachStartTime: undefined as unknown as Date, // 返校时间段 HH:mm
    reachEndTime: undefined as unknown as Date,

    // 基本信息
    origin: undefined as unknown as string[], // 始发地
    destination: undefined as unknown as string[], // 目的地

    // 交通信息
    vehicleType: undefined, // 交通工具
    vehicleInfo: undefined as unknown as string, // 车次 / 航班 / 车辆信息
    transit: undefined as unknown as string, // 中转站
    vehicleArriveTime: undefined, // 交通工具到达时间

    // 校区
    campus: campusData[0].value,
  },

  reducers: {
    setData(pre, payload) {
      return { ...pre, ...payload };
    },
  },
  effects: () => ({
    async initialStatus() {
      const loadingTip = await ui.loading('加载中', 0);

      try {
        const { data } = await network.fetch.get('https://os.ncuos.com/api/stagger/before/student');

        (this as any).setData({ status: getStatus(data.code) });
      } catch (e) {
        ui.fail('未知错误，请重试');
      } finally {
        loadingTip();
      }
    },
    async submit(payload, rootState) {
      const {
        campus,
        origin,
        destination,
        transit,
        reachDate: reach_date,
        reachStartTime: reach_start_time,
        reachEndTime: reach_end_time,
        vehicleType: vehicle_type = [],
        vehicleInfo: vehicle_info,
        vehicleArriveTime: vehicle_arrive_time,
      } = rootState.common;

      const loadingTip = await ui.loading('加载中', 0);

      try {
        const params = {
          reach_date,
          reach_start_time,
          reach_end_time,

          // 基本信息
          origin: origin?.join('-') ?? '未知',
          destination: destination?.[0] ?? '未知',

          // 交通信息
          vehicle_type: vehicle_type?.[0] ?? '未知',
          vehicle_info,
          transit,
          vehicle_arrive_time,

          // 校区
          campus,
        };

        console.log(JSON.stringify(params));

        const { data } = await network.fetch.post('https://os.ncuos.com/api/stagger/before/student', params);

        const { status, message } = data;

        if (status) {
          (this as any).setData({ status: getStatus(1) });

          ui.success(message);
        } else {
          ui.fail(message);
        }
      } catch (e) {
        console.log(e);
        ui.fail('未知错误，请重试');
      } finally {
        loadingTip();
      }
    },
  }),
};
