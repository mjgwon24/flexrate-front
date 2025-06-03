import { useQuery } from '@tanstack/react-query';

import {
  getConsumptionReport,
  getConsumptionStaticstic,
  getReportAvailableMonth,
} from '@/apis/consumption';
import {
  GetConsumptionReportResponse,
  GetConsumptionStaticsticResponse,
} from '@/types/consumption.type';

export const useConsumptionReport = (
  token: string,
  month?: string,
  enabled: boolean = !!token && !!month
) => {
  return useQuery<GetConsumptionReportResponse[]>({
    queryKey: ['consumption-reports', month],
    queryFn: async () => {
      if (!month) return [];
      return await getConsumptionReport(token, month);
    },
    enabled,
  });
};

export const useAvailableConsumptionMonth = (token: string) => {
  return useQuery<string[]>({
    queryKey: ['consumption-report-month'],
    queryFn: () => getReportAvailableMonth(token),
    enabled: !!token,
  });
};

export const useConsumptionStatistic = (
  token: string,
  month?: string,
  enabled: boolean = !!token && !!month
) => {
  return useQuery<GetConsumptionStaticsticResponse>({
    queryKey: ['consumption-statistic', month],
    queryFn: async () => {
      if (!month) throw new Error('해당 월 소비 데이터가 존재하지 않습니다.');
      return await getConsumptionStaticstic(token, month);
    },
    enabled,
  });
};
