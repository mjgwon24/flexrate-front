export type EMPLOYMENT_TYPE = '정규직' | '계약직' | '아르바이트' | '자영업' | '무직' | '기타';
export type RESIDENT_TYPE = '자가' | '월세' | '전세' | '무주택';
export type PURPOSE_TYPE = '생활비' | '사업자금' | '자동차 구입' | '교육비' | '주택자금' | '기타';

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
  '자동차 구입',
  '교육비',
  '주택자금',
  '기타',
];

export type LoanStatusType = 'PENDING' | 'REJECTED' | 'EXECUTED';

export const loanStatusMap: Record<LoanStatusType, { title: string; description: string }> = {
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
