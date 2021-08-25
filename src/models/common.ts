import { campusData } from '@/utils/data';
import { getStatus } from '@/utils/common';
import network from 'mincu-network';
import ui from 'mincu-ui';
import dayjs from 'dayjs';

export default {
  state: {
    status: '加载中...',
    labelColor: '#7B7B7B',

    // 入校时间
    reachDate: undefined, // 入校日期 YYYY-MM-DD
    reachStartTime: undefined as unknown as Date, // 入校时间段 HH:mm
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

        if (data.data) {
          const {
            origin: originPlace,
            vehicle_arrive_time,
            transit,
            reach_date,
            reach_start_time,
            reach_end_time,
            vehicle_type,
            vehicle_info,
            campus = campusData[0].value,
            destination,
          } = data.data as IData;

          const reachDate = reach_date && new Date(dayjs(reach_date).valueOf());
          (this as any).setData({
            campus,
            origin: originPlace && originPlace?.split('-'),
            destination: destination && [destination],
            transit: transit === '-' ? null : transit,
            reachDate,
            reachStartTime: reach_start_time && new Date(dayjs(`${reach_date} ${reach_start_time}`).valueOf()),
            reachEndTime: reach_end_time && new Date(dayjs(`${reach_date} ${reach_end_time}`).valueOf()),
            vehicleType: vehicle_type && [vehicle_type],
            vehicleInfo: vehicle_info,
            vehicleArriveTime: vehicle_arrive_time && new Date(dayjs(`${reach_date} ${vehicle_arrive_time}`).valueOf()),
          });
        }

        const { label, color } = getStatus(data.code);
        (this as any).setData({ status: label, labelColor: color });
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
          reach_date: dayjs(reach_date).format('YYYY-MM-DD'),
          reach_start_time: dayjs(reach_start_time).format('HH:mm:ss'),
          reach_end_time: dayjs(reach_end_time).format('HH:mm:ss'),

          // 基本信息
          origin: origin?.join('-') ?? '未知',
          destination: destination?.[0] ?? '未知',

          // 交通信息
          vehicle_type: vehicle_type?.[0] ?? '未知',
          vehicle_info,
          transit,
          vehicle_arrive_time: dayjs(vehicle_arrive_time).format('HH:mm:ss'),

          // 校区
          campus,
        };

        const { data } = await network.fetch.post('https://os.ncuos.com/api/stagger/before/student', params);

        const { status, message } = data;

        if (status) {
          const { label, color } = getStatus(1);
          (this as any).setData({ status: label, labelColor: color });
          window.scrollTo(0, 0);
          ui.success(message);
        } else {
          ui.fail(message);
        }
      } catch (e) {
        ui.fail('未知错误，请重试');
      } finally {
        loadingTip();
      }
    },
  }),
};
