import {
  GetConsumptionReportResponse,
  GetConsumptionStaticsticResponse,
} from '@/types/consumption.type';

import { apiClient } from './client';

export const getConsumptionReport = async (token: string, month: string) => {
  const { data } = await apiClient.get<GetConsumptionReportResponse[]>(
    '/api/reports/consumption-report',
    {
      headers: { Authorization: `Bearer ${token}` },
      params: month ? { month } : undefined,
    }
  );
  return data;
};

export const getReportAvailableMonth = async (token: string) => {
  const { data } = await apiClient.get<string[]>('/api/reports/available-months', {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export const getConsumptionStaticstic = async (token: string, month: string) => {
  const { data } = await apiClient.get<GetConsumptionStaticsticResponse>(
    '/api/statistics/consumption-statistic',
    {
      headers: { Authorization: `Bearer ${token}` },
      params: month ? { month } : undefined,
    }
  );
  return data;
};
