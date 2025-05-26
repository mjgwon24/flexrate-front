export interface RawMember {
  id: number;
  name: string;
  email: string;
  sex: 'MALE' | 'FEMALE';
  birthDate: string;
  createdAt: string;
  hasLoan: boolean;
  lastLoginAt: string;
  loanTransactionCount: number;
  memberStatus: 'ACTIVE' | 'WITHDRAWN' | 'SUSPENDED';
  [key: string]: unknown;
}

export interface RawLoanApplication {
  id: number;
  status: 'PRE_APPLIED' | 'PENDING' | 'REJECTED' | 'EXECUTED' | 'COMPLETED';
  appliedAt: string;
  applicant: string;
  applicantId: number;
  availableLimit: number;
  initialRate: number;
  prevLoanCount: number;
  type: 'NEW' | 'EXTENSION' | 'REDEVELOPMENT';
}

export interface LoanApiResponse {
  paginationInfo: PaginationInfo;
  loans: RawLoanApplication[];
}

export interface LoanDetailsApiResponse {
  applicationId: number;
  applicantName: string;
  consumptionType: string | null;
  consumeGoal: string | null;
  applicationStatus: string | null;
  requestedAmount: number | null;
  repaymentStartDate: string | null;
  repaymentEndDate: string | null;
  repaymentMonths: number | null;
  appliedAt: string | null;
  approvedMaxAmount: number | null;
  initialInterestRate: number | null;
  interestRateMin: number | null;
  interestRateMax: number | null;
  lastInterestRate: number | null;
  lastInterestDate: string | null;
  employmentType: string | null;
  annualIncome: number | null;
  residenceType: string | null;
  isBankrupt: boolean | null;
  loanPurpose: string | null;
}

export interface PaginationInfo {
  currentPage: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

export interface GetAdminMembersResponse {
  members: RawMember[];
  paginationInfo: PaginationInfo;
}

export interface PatchMemberPayload {
  name?: string;
  email?: string;
  sex?: string;
  birthDate?: string;
  memberStatus?: string;
}

export interface PatchLoanStatusPayload {
  status?: string;
  reason?: string;
}
