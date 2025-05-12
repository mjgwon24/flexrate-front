export type GenderType = 'ALL' | 'FEMALE' | 'MALE';
export type UserStatusType = 'ALL' | 'ACTIVE' | 'INACTIVE';
export type LoanStatusType = 'ALL' | 'TRUE' | 'FALSE';

export type FilterType = {
  name: string;
  gender: GenderType;
  birthRange: [string, string] | null;
  userStatus: UserStatusType;
  joinDateRange: [string, string] | null;
  loanStatus: LoanStatusType;
  transactionCountMin: number | null;
  transactionCountMax: number | null;
};
