export interface LoanReviewApplicationRequest {
  employmentType: string;
  annualIncome: number;
  residenceType: string;
  isBankrupt: boolean;
  loanPurpose: string;
}

export interface LoanReviewApplicationResponse {
  name: string;
  screeningDate: string;
  loanLimit: number;
  initialRate: number;
  rateRangeFrom: number;
  rateRangeTo: number;
  creditScore: number;
  terms: number;
}

export interface LoanApplicationRequest {
  loanAmount: number;
  repaymentMonth: number;
}

export interface LoanApplicationResponse {
  loanApplicationResult: string;
  loanApplicationAmount: number;
  loanInterestRate: number;
  loanStartDate: string;
  loanEndDate: string;
}
