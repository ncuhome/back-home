import { uiModule } from 'mincu-react';
import dayjs from 'dayjs';

export const open = (str: string) => {
  uiModule.toScreen({
    screen: 'Webview',
    params: {
      url: str,
    },
  });
};

export const getCalcTime = (
  time: Date | undefined,
  mode: 'subtract' | 'add',
  value: number,
  unit: dayjs.OpUnitType,
): Date | undefined => {
  if (!time) return undefined;

  const now = dayjs(time as any);
  const changed = now[mode](value, unit);

  const down = now.set('hour', 19);

  if (now.isAfter(down)) {
    return new Date(now.set('hour', 23).set('minute', 59).valueOf());
  }

  // eslint-disable-next-line @iceworks/best-practices/recommend-polyfill
  return new Date(changed.valueOf());
};

const statusMap = {
  [-2]: '暂时不返校',
  [-1]: '延迟返校',
  0: '未登记',
  1: '已登记并审核中',
  2: '审批通过',
  3: '已返校',
};

export const getStatus = (code: number): string => {
  return statusMap[code];
};
