'use client';

import { useState } from 'react';

import AgreementCredit from '@/components/creditEvaluationStep/AgreementCredit/AgreementCredit';
import AgreementEvaluation from '@/components/creditEvaluationStep/AgreementEvaluation/AgreementEvaluation';
import Header from '@/components/Header/Header';
import { Wrapper } from '@/components/loanApplicationFunnel/LoanApplicationFunnel.style';

type Step = 'agreement' | 'evaluation';

const CreditEvaluation = () => {
  const [step, setStep] = useState<Step>('agreement');

  return (
    <Wrapper>
      <Header type="신용 점수 평가" backIcon={true} />
      {step === 'agreement' ? (
        <AgreementCredit onNext={() => setStep('evaluation')} />
      ) : (
        <AgreementEvaluation />
      )}
    </Wrapper>
  );
};

export default CreditEvaluation;
