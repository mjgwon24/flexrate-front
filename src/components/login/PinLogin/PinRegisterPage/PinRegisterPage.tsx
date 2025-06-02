'use client';

import React, { useState } from 'react';

import Button from '@/components/Button/Button';
import AddPinLogin from '@/components/login/PinLogin/AddPinLogin/AddPinLogin';
import PinEmailForm from '@/components/login/PinLogin/PinEmailForm/PinEmailForm';

import { BackButton, BtnContainer, Container, Title } from './PinRegister.style';

interface PinRegisterPageProps {
  onBack: () => void;
}

const PinRegisterPage = ({ onBack }: PinRegisterPageProps) => {
  const [emailStatus, setEmailStatus] = useState<string>('');

  if (emailStatus === 'pending') {
    return (
      <PinEmailForm
        onVerified={(emailFromForm: string) => {
          alert(`이메일 인증 완료: ${emailFromForm}`);
          setEmailStatus(emailFromForm);
        }}
      />
    );
  }

  if (emailStatus && emailStatus !== 'pending') {
    return (
      <AddPinLogin
        email={emailStatus}
        onComplete={() => {
          alert('PIN 등록 완료!');
          setEmailStatus('');
          onBack();
        }}
      />
    );
  }

  return (
    <Container>
      <Title>아직 간편 비밀번호가 없어요</Title>
      <BtnContainer>
        <Button text="등록하기" onClick={() => setEmailStatus('pending')} />
        <BackButton type="button" onClick={onBack}>
          다른 로그인 방법 &gt;
        </BackButton>
      </BtnContainer>
    </Container>
  );
};

export default PinRegisterPage;
