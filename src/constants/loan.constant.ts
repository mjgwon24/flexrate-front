import { LoanStatusType } from '@/types/user.type';

export type EMPLOYMENT_TYPE = '정규직' | '계약직' | '아르바이트' | '자영업' | '무직' | '기타';
export type RESIDENT_TYPE = '자가' | '월세' | '전세' | '무주택';
export type PURPOSE_TYPE = '생활비' | '사업자금' | '자동차구입' | '교육비' | '주택자금' | '기타';

export const EMPLOYMENT_TYPE_OPTIONS: EMPLOYMENT_TYPE[] = [
  '정규직',
  '계약직',
  '아르바이트',
  '자영업',
  '무직',
  '기타',
];

export const RESIDENT_TYPE_OPTIONS: RESIDENT_TYPE[] = ['자가', '월세', '전세', '무주택'];

export const PURPOSE_TYPE_OPTIONS: PURPOSE_TYPE[] = [
  '생활비',
  '사업자금',
  '자동차구입',
  '교육비',
  '주택자금',
  '기타',
];

export type EmploymentTypeEnum =
  | 'FULL_TIME'
  | 'CONTRACT'
  | 'PART_TIME'
  | 'SELF_EMPLOYED'
  | 'UNEMPLOYED'
  | 'ETC';

export type ResidenceTypeEnum = 'OWN' | 'JEONSE' | 'MONTHLY' | 'NO_HOUSE';

export type LoanPurposeEnum = 'LIVING' | 'BUSINESS' | 'CAR' | 'EDUCATION' | 'HOUSE' | 'ETC';

export const EMPLOYMENT_TYPE_MAP: Record<EMPLOYMENT_TYPE, EmploymentTypeEnum> = {
  정규직: 'FULL_TIME',
  계약직: 'CONTRACT',
  아르바이트: 'PART_TIME',
  자영업: 'SELF_EMPLOYED',
  무직: 'UNEMPLOYED',
  기타: 'ETC',
};

export const RESIDENT_TYPE_MAP: Record<RESIDENT_TYPE, ResidenceTypeEnum> = {
  자가: 'OWN',
  월세: 'MONTHLY',
  전세: 'JEONSE',
  무주택: 'NO_HOUSE',
};

export const PURPOSE_TYPE_MAP: Record<PURPOSE_TYPE, LoanPurposeEnum> = {
  생활비: 'LIVING',
  사업자금: 'BUSINESS',
  자동차구입: 'CAR',
  교육비: 'EDUCATION',
  주택자금: 'HOUSE',
  기타: 'ETC',
};

export const loanStatusMap: Partial<
  Record<LoanStatusType, { title: string; description: string }>
> = {
  PENDING: {
    title: '대출 신청 처리 중입니다',
    description: `영업일 기준 하루 이내에 알림을 통해\n심사 결과가 안내될 예정입니다`,
  },
  REJECTED: {
    title: '대출이 거절되었습니다',
    description: `신청하신 조건으로는 대출이 어렵습니다.\n다른 조건을 시도해보세요.`,
  },
  EXECUTED: {
    title: '대출 실행이 완료되었습니다',
    description: `대출금이 입금되었습니다.\n내역을 마이페이지에서 확인하세요.`,
  },
};

export const STATUS_LABEL: Record<string, string> = {
  PENDING: '심사중',
  EXECUTED: '실행중',
  REJECTED: '거절',
  COMPLETED: '상환 완료',
  PRE_APPLIED: '신청 접수중',
  NONE: '초기'
};

// 고용 형태
export const EMPLOYMENT_TYPE_LABEL: Record<string, string> = {
  FULL_TIME: '정규직',
  CONTRACT: '계약직',
  PART_TIME: '비정규직',
  SELF_EMPLOYED: '자영업',
  UNEMPLOYED: '무직',
  ETC: '기타',
};

// 주거 형태
export const RESIDENCE_TYPE_LABEL: Record<string, string> = {
  OWN: '자가',
  JEONSE: '전세',
  MONTHLY: '월세',
};

// 대출 목적
export const LOAN_PURPOSE_LABEL: Record<string, string> = {
  LIVING: '생활비',
  BUSINESS: '사업자금',
  CAR: '자동차 구입',
  EDUCATION: '교육비',
  HOUSE: '주택자금',
  ETC: '기타',
};

// 개인회생 여부
export function BANKRUPT_LABEL(v: boolean | null | undefined): string {
  if (v === null || v === undefined) return '-';
  return v ? '예' : '아니요';
}
