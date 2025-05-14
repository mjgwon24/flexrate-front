export type SexType = 'ALL' | 'FEMALE' | 'MALE';
export type MemberStatusType = 'ALL' | 'ACTIVE' | 'WITHDRAWN' | 'SUSPENDED';
export type HasLoanType = 'ALL' | 'TRUE' | 'FALSE';

export type FilterType = {
  name: string;
  sex: SexType;
  birthDateRange: [string, string] | null;
  memberStatus: MemberStatusType;
  createdDateRange: [string, string] | null;
  hasLoan: HasLoanType;
  transactionCountMin: number | null;
  transactionCountMax: number | null;
};
