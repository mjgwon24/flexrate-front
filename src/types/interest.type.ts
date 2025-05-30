export interface InterestStatsInfo {
  period: string;
  averageRate: number;
  changeRatePercent: number;
}

export interface InterestRateResponse {
  rates: InterestStatsInfo[];
  highestRate: number;
  lowestRate: number;
}

export interface InterestCurrentResponse {
  currentRate: number;
  previousRate: number;
  changeRatePercent: number;
}

export interface MainResponse {
  monthlyPayment: number;
  repaymentRate: number;
  monthlyPrincipal: number;
  monthlyInterest: number;
  nextPaymentDate: string;
  loanRepaymentTransactionNum: number;
  recentRepaymentDate: string | null;
  startDate: string;
  interestChangedNum: number;
  totalAmount: number;
  repaymentMonth: number;
}
