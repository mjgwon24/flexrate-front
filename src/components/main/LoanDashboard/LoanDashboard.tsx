import Image from 'next/image';
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
import ProgressBar from '@/components/ProgressBar/ProgressBar';

const LoanDashboard = () => {
  return (
    <RecentLoanProgressContainer>
      <TitleContainer>
        <Title>나의 이번달 대출금</Title>
        <AccountContainer>
          <Account>280,000원</Account>
          <Image src={'/icons/badgeIc.svg'} width={97} height={18} alt="잘 상환 중이에요" />
        </AccountContainer>
      </TitleContainer>
      <ProgressBar type="MAIN" currentStep={10} totalSteps={100} />
      <TransparentCardContainer>
        <TransparentCard>
          <TransparentCardTitle>원금</TransparentCardTitle>
          <TransparentCardAccount>250,000원</TransparentCardAccount>
          <Description>3,000,000원 / 12개월</Description>
        </TransparentCard>
        <TransparentCard>
          <TransparentCardTitle>이자</TransparentCardTitle>
          <TransparentCardAccount>30,000원</TransparentCardAccount>
          <Description>3,000,000원 X 12/12개월</Description>
        </TransparentCard>
      </TransparentCardContainer>
    </RecentLoanProgressContainer>
  );
};

export default LoanDashboard;
