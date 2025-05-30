import { PeriodKey } from '@/types/chart.type';

const ordinal = ['첫째', '둘째', '셋째', '넷째', '다섯째'];

export const formatPeriodLabel = (period: string, type: PeriodKey): string => {
  if (type === 'DAILY') return period.replace(/-/g, '.');
  if (type === 'MONTHLY') return period.replace('-', '.');

  if (type === 'WEEKLY') {
    const [yearStr, weekStr] = period.split('-W');
    const year = Number(yearStr);
    const week = Number(weekStr);

    const firstDayOfYear = new Date(year, 0, 1);
    const weekStartDate = new Date(firstDayOfYear.getTime() + (week - 1) * 7 * 24 * 60 * 60 * 1000);

    const month = weekStartDate.getMonth() + 1;
    const weekOfMonth = Math.ceil((weekStartDate.getDate() + weekStartDate.getDay()) / 7);

    return `${month}월 ${ordinal[weekOfMonth - 1] ?? `${weekOfMonth}번째`} 주`;
  }

  return period;
};
