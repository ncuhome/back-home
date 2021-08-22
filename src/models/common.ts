import { campusData } from '@/utils/data';
import network from 'mincu-network';

// TODO: 持久化缓存
export default {
  state: {
    // 返校时间
    reachDate: undefined, // 返校日期 YYYY-MM-DD
    reachStartTime: undefined as unknown as Date, // 返校时间段 HH:mm
    reachEndTime: undefined as unknown as Date,

    // 基本信息
    origin: undefined as unknown as string[], // 始发地   TODO:
    destination: undefined, // 目的地

    // 交通信息
    vehicleType: undefined, // 交通工具       TODO:
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
      const {
        campus,
        origin,
        destination,
        transit,
        reachDate: reach_date,
        reachStartTime: reach_star_time,
        reachEndTime: reach_end_time,
        vehicleType: vehicle_type = [],
        vehicleInfo: vehicle_info,
        vehicleArrivalTime: vehicle_arrival_time,
      } = rootState.common;

      // const res = await network.fetch.post('https://os.ncuos.com/api/stagger/before/student', {
      //   reach_date,
      //   reach_star_time,
      //   reach_end_time,

      //   // 基本信息
      //   origin: origin?.join('-') ?? '未知',
      //   destination,

      //   // 交通信息
      //   vehicle_type: vehicle_type?.[0] ?? '未知',
      //   vehicle_info,
      //   transit,
      //   vehicle_arrival_time,

      //   // 校区
      //   campus,
      // });

      console.log(res);
    },
  }),
};
