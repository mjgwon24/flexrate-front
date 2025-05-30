export const PERIOD_TYPES = {
  DAILY: { label: '1일', maxRangeInDays: 7, xAxisFormat: 'yyyy.MM.dd' },
  WEEKLY: { label: '1주일', maxRangeInDays: 28, xAxisFormat: "'W'w" },
  MONTHLY: { label: '1개월', maxRangeInDays: 90, xAxisFormat: 'yyyy.MM' },
} as const;

export type PeriodKey = keyof typeof PERIOD_TYPES;
