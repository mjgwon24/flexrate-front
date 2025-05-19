'use client';
import React, { useState } from 'react';
import { Wrapper } from '@/components/loanApplicationFunnel/LoanApplicationFunnel.style';
import Header from '@/components/Header/Header';
import LoginSelector from '@/components/login/LoginSelector/LoginSelector';
import LoginForm from '@/components/login/LoginForm/LoginForm';

type Step = 'selector' | 'form';

export default function LoginPage() {
  const [step, setStep] = useState<Step>('selector');

  return (
    <Wrapper>
      <Header />
      {step === 'selector' && (
        <LoginSelector
          onSelectEmail={() => setStep('form')}
          onSelectFace={() => {
            // Face ID 로직
          }}
          onSelectPassword={() => setStep('form')}
        />
      )}
      {step === 'form' && <LoginForm />}
    </Wrapper>
  );
}
