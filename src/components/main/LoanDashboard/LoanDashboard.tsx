import Image from 'next/image';

import ProgressBar from '@/components/ProgressBar/ProgressBar';
import { InterestCurrentResponse, MainResponse } from '@/types/interest.type';
import { formatNumberComma } from '@/utils/formatNumberComma';

import {
  Account,
  AccountContainer,
  Description,
  RecentLoanProgressContainer,
  Title,
  TitleContainer,
  TransparentCard,
  TransparentCardAccount,
  TransparentCardContainer,
  TransparentCardTitle,
} from './LoanDashboard.style';

const LoanDashboard = ({
  mainData,
  currentRate,
}: {
  mainData: MainResponse;
  currentRate: number;
}) => {
  const totalAmount = formatNumberComma(mainData.totalAmount);
  const monthlyPayment = formatNumberComma(mainData.monthlyPayment);
  const monthlyPrincipal = formatNumberComma(mainData.monthlyPrincipal);
  const monthlyInterest = formatNumberComma(mainData.monthlyInterest);

  return (
    <RecentLoanProgressContainer>
      <TitleContainer>
        <Title>나의 이번달 대출금</Title>
        <AccountContainer>
          <Account>{monthlyPayment}원</Account>
          <Image src={'/icons/badgeIc.svg'} width={97} height={18} alt="잘 상환 중이에요" />
        </AccountContainer>
      </TitleContainer>
      <ProgressBar type="MAIN" currentStep={mainData.repaymentRate} totalSteps={100} />
      <TransparentCardContainer>
        <TransparentCard>
          <TransparentCardTitle>원금</TransparentCardTitle>
          <TransparentCardAccount>{monthlyPrincipal}원</TransparentCardAccount>
          <Description>
            {totalAmount}원 / {mainData.repaymentMonth}개월
          </Description>
        </TransparentCard>
        <TransparentCard>
          <TransparentCardTitle>이자</TransparentCardTitle>
          <TransparentCardAccount>{monthlyInterest}원</TransparentCardAccount>
          <Description>
            {totalAmount}원 X {currentRate} / {mainData.repaymentMonth}개월
          </Description>
        </TransparentCard>
      </TransparentCardContainer>
    </RecentLoanProgressContainer>
  );
};

export default LoanDashboard;
