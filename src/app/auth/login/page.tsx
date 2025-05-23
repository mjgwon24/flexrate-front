'use client';
import React, { useState } from 'react';

import Header from '@/components/Header/Header';
import { Wrapper } from '@/components/loanApplicationFunnel/LoanApplicationFunnel.style';
import LoginForm from '@/components/login/LoginForm/LoginForm';
import LoginSelector from '@/components/login/LoginSelector/LoginSelector';
import PinLogin from '@/components/login/PinLogin/PinLogin'; 
import PinRegisterPage from '@/components/login/PinLogin/PinRegisterPage.style.ts/PinRegisterPage'

type Step = 'selector' | 'form' | 'PinEmailVerification' |'pin';

const LoginPage = () => {
  const [step, setStep] = useState<Step>('selector');

  const handleBack = () => {
    setStep('selector');
  };

  return (
    <Wrapper>
      <Header />
      {step === 'selector' && (
        <LoginSelector
          onSelectPin={() => setStep('pin')}
          onSelectFace={() => {
            // Face ID 로직
          }}
          onSelectPassword={() => setStep('form')}
        />
      )}
      {step === 'form' && <LoginForm />}

      {step === 'pin' && <PinLogin/>}
    </Wrapper>
  );
};

export default LoginPage;
