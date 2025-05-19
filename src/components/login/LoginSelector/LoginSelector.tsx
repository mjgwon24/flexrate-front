'use client';
import React from 'react';
import {
  BtnContainer,
  BtnWrapper,
  Container,
  Question,
  SheetBtn,
  Title,
} from './LoginSelector.style';
import BottomSheet from '@/components/BottomSheet/BottomSheet';
import Image from 'next/image';

export type LoginSelectorProps = {
  onSelectPassword: () => void;
  onSelectEmail: () => void;
  onSelectFace: () => void;
};

const LoginSelector = ({ onSelectEmail, onSelectFace, onSelectPassword }: LoginSelectorProps) => {
  return (
    <Container>
      <Title>
        반가워요!
        <br />
        로그인을 진행할게요
      </Title>
      <BottomSheet isOpen={true}>
        <Question>어떤 방법으로 로그인할까요?</Question>
        <BtnWrapper>
          <SheetBtn onClick={onSelectEmail}>
            <BtnContainer>
              <Image src={'/imgs/lock.svg'} width={36} height={36} alt="간편 비밀번호" />
              간편 비밀번호
            </BtnContainer>
          </SheetBtn>
          <SheetBtn onClick={onSelectFace}>
            <BtnContainer>
              <Image src={'/imgs/faceId.svg'} width={36} height={36} alt="지문" />
              지문
            </BtnContainer>
          </SheetBtn>
          <SheetBtn onClick={onSelectPassword}>
            <BtnContainer>
              <Image src={'/imgs/pattern.svg'} width={36} height={36} alt="일반 로그인" />
              일반 로그인
            </BtnContainer>
          </SheetBtn>
        </BtnWrapper>
      </BottomSheet>
    </Container>
  );
};

export default LoginSelector;
