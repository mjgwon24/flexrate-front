'use client';

import { useFunnel } from '@use-funnel/browser';

import Header from '../Header/Header';
import ProgressBar from '../ProgressBar/ProgressBar';

import { CreditStep } from './CreditStep/CreditStep';
import { JobStep } from './JobStep/JobStep';
import {
  Container,
  Description,
  HeaderContainer,
  JobFlexStartContainer,
  Name,
  Title,
  Wrapper,
} from './LoanApplicationFunnel.style';
import { PurposeStep } from './PurposeStep/PurposeStep';
import ReviewResultAndLoanApplication from './ReviewResultAndLoanApplication/ReviewResultAndLoanApplication';
import { useRouter } from 'next/navigation';

export type FunnelContextMap = {
  직업정보입력: {
    employmentType: string;
  };
  신용정보입력: {
    annualIncome: string;
    creditGrade: string;
    residenceType: string;
    isBankrupt: boolean;
  };
  대출목적입력: {
    loanPurpose: string;
  };
  대출신청접수: {
    loanAmount: number;
    repaymentMonth: number;
  };
};

const LoanApplicationFunnel = () => {
  const funnel = useFunnel<FunnelContextMap>({
    id: 'loan-application-funnel',
    initial: {
      step: '직업정보입력',
      context: {
        employmentType: '',
      },
    },
  });

  const steps: (keyof FunnelContextMap)[] = [
    '직업정보입력',
    '신용정보입력',
    '대출목적입력',
    '대출신청접수',
  ];

  const currentIndex = steps.findIndex((s) => s === funnel.step);
  const totalSteps = steps.length;

  const router = useRouter();

  return (
    <Wrapper>
      <HeaderContainer>
        <Header type="대출 신청" backIcon={true} />
        <ProgressBar totalSteps={totalSteps} currentStep={currentIndex + 1} />
      </HeaderContainer>
      <JobFlexStartContainer>
        {funnel.step !== '대출신청접수' ? (
          <>
            <Title>대출 심사 정보 입력</Title>
            <Description>
              대출 심사를 진행하기 위해 <br /> 본인의 신용 평가 정보를 기입해주세요
            </Description>
          </>
        ) : (
          <Title>
            <Name>서채연</Name>님의 대출 심사 결과
          </Title>
        )}
      </JobFlexStartContainer>
      <Container>
        <funnel.Render
          직업정보입력={funnel.Render.with({
            render: ({ context }) => (
              <JobStep
                value={context}
                onChange={(ctx) => funnel.history.replace('직업정보입력', ctx)}
                onNext={() =>
                  funnel.history.push('신용정보입력', (prev) => ({
                    ...prev,
                    annualIncome: '',
                    creditGrade: '',
                    residenceType: '',
                    isBankrupt: false,
                  }))
                }
              />
            ),
          })}
          신용정보입력={funnel.Render.with({
            render: ({ context }) => (
              <CreditStep
                value={context}
                onChange={(ctx) => funnel.history.replace('신용정보입력', ctx)}
                onNext={() =>
                  funnel.history.push('대출목적입력', (prev) => ({
                    ...prev,
                    loanPurpose: '',
                  }))
                }
              />
            ),
          })}
          대출목적입력={funnel.Render.with({
            render: ({ context }) => (
              <PurposeStep
                value={context}
                onChange={(ctx) => funnel.history.replace('대출목적입력', ctx)}
                onSubmit={async () => {
                  // ✅ TODO: 대출 심사 결과 요청 api 함수 호출
                  funnel.history.push('대출신청접수', {
                    loanAmount: 0,
                    repaymentMonth: 0,
                  });
                }}
              />
            ),
          })}
          대출신청접수={funnel.Render.with({
            render: ({ context }) => (
              <ReviewResultAndLoanApplication
                value={context}
                onChange={(ctx) => funnel.history.replace('대출신청접수', ctx)}
                onSubmit={() => {
                  router.push('/loan-result');
                }}
              />
            ),
          })}
        />
      </Container>
    </Wrapper>
  );
};

export default LoanApplicationFunnel;
