import { campusData } from '@/utils/data';

export default {
  state: {
    // 返校时间
    reachDate: undefined, // 返校日期 YYYY-MM-DD
    reachStartTime: undefined as unknown as Date, // 返校时间段 HH:mm
    reachEndTime: undefined as unknown as Date,

    // 基本信息
    origin: undefined as unknown as string[], // 始发地
    destination: undefined, // 目的地

    // 交通信息
    vehicleType: undefined, // 交通工具
    vehicleInfo: '', // 车次 / 航班 / 车辆信息
    transit: '', // 中转站
    vehicleArrivalTime: undefined, // 交通工具到达时间

    // 校区
    campus: campusData[0].value,
  },

  reducers: {
    setData(pre, payload) {
      return { ...pre, ...payload };
    },
  },
  effects: () => ({
    async submit(payload, rootState) {
      const data = rootState.common;
      console.log(data);
    },
  }),
};
