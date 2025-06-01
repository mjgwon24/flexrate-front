export const categoryMap: Record<string, string> = {
  FOOD: '식비',
  LIVING: '주거/생활',
  LEISURE: '여가/취미',
  TRANSPORT: '교통',
  COMMUNICATION: '통신',
  EDUCATION: '교육',
  HEALTH: '의료/건강',
  ETC: '기타',
};

export interface ReportMonth {
  year: number;
  month: string;
  monthValue: number;
  leapYear: boolean;
}

export interface GetConsumptionReportResponse {
  reportId: number;
  memberId: number;
  reportMonth: ReportMonth;
  summary: string;
  createdAt: string;
}

export interface stats {
  category: string;
  amount: number;
  percentage: number;
}

export interface GetConsumptionStaticsticResponse {
  memberId: number;
  month: ReportMonth;
  stats: stats[];
}
