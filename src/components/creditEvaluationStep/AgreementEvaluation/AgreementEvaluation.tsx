'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import Button from '@/components/Button/Button';
import CircularChart from '@/components/CircularCart/CircularCart';
import { Container, Title } from '@/components/loanApplicationFunnel/LoanApplicationFunnel.style';
import { Description } from '@/components/loanApplicationFunnel/ReviewResultAndLoanApplication/ReviewResultAndLoanApplication.style';

import { BtnContainer, TextContainer } from './AgreementEvaluation.style';

const AgreementEvaluation = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [score] = useState(720);
  const [rank] = useState('상위 00%');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Container>
      <CircularChart loading={loading} score={score} rank={rank} />
      {!loading && (
        <>
          <TextContainer>
            <Title>서채연님의 신용 점수를 산출했어요</Title>
            <Description>이제 대출 신청이 가능해요</Description>
          </TextContainer>
          <BtnContainer>
            <Button text="메인페이지로 이동" varient="TERTIARY" onClick={() => router.push('/')} />
            <Button
              text="대출 신청하기"
              varient="PRIMARY"
              onClick={() => router.push('/loan-application')}
            />
          </BtnContainer>
        </>
      )}
    </Container>
  );
};

export default AgreementEvaluation;
