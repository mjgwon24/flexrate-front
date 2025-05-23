'use client';

import React from 'react';

import Button from '@/components/Button/Button';

import { BackButton, BtnContainer, Container, Title } from './PinRegister.style';

const PinRegisterPage = ({ onBack }: { onBack: () => void }): JSX.Element => {
  return (
    <Container>
      <Title>아직 간편 비밀번호가 없어요</Title>
      <BtnContainer>
        <Button
          text='등록하기'
        />
        <BackButton
          type="button"
          onClick={onBack}
          
        >
          다른 로그인 방법 &gt;
        </BackButton>
      </BtnContainer>
    </Container>
  );
};

export default PinRegisterPage;
