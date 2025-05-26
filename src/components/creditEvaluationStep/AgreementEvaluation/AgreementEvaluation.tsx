'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import Button from '@/components/Button/Button';
import CircularChart from '@/components/CircularChart/CircularChart';
import { Container, Title } from '@/components/loanApplicationFunnel/LoanApplicationFunnel.style';
import { Description } from '@/components/loanApplicationFunnel/ReviewResultAndLoanApplication/ReviewResultAndLoanApplication.style';
import { useCreditScoreEvaluate } from '@/hooks/useCreditScore';
import { useUserStore } from '@/stores/userStore';

import { BtnContainer, TextContainer, Wrapper } from './AgreementEvaluation.style';

const AgreementEvaluation = () => {
  const user = useUserStore((state) => state.user);

  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const { data: creditResult } = useCreditScoreEvaluate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Wrapper>
      <Container>
        <CircularChart
          loading={loading}
          score={creditResult?.creditScore ?? 0}
          rank={creditResult?.percentile ?? 0}
        />
        {!loading && (
          <>
            <TextContainer>
              <Title>{`${user?.username}님의 신용 점수를 산출했어요`}</Title>
              <Description>이제 대출 신청이 가능해요</Description>
            </TextContainer>
            <BtnContainer>
              <Button
                text="메인페이지로 이동"
                varient="TERTIARY"
                onClick={() => router.push('/')}
              />
              <Button
                text="대출 신청하기"
                varient="PRIMARY"
                onClick={() => router.push('/loan-application')}
              />
            </BtnContainer>
          </>
        )}
      </Container>
    </Wrapper>
  );
};

export default AgreementEvaluation;
