'use client';

import React from 'react';

import Button from '@/components/Button/Button';

import { BtnContainer } from '../LoginForm/LoginForm.style';
import { Container, Title } from '../LoginSelector/LoginSelector.style';

const PinRegisterPage = (): JSX.Element => {
  return (
    <Container>
      <Title>아직 간편 비밀번호가 없어요</Title>

      <BtnContainer>
        <Button
          text='등록하기'
        />
        <div className="font-pretendard-body2-m-14 text-semantic-text-normal-sub2 text-center">
          다른 로그인 방법 &gt;
        </div>
      </BtnContainer>
    </Container>
  );
};

export default PinRegisterPage;
