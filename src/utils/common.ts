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

  return new Date(dayjs(time as any)[mode](value, unit).valueOf());
};
