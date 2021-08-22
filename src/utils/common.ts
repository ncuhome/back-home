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

  return new Date(changed.valueOf());
};
