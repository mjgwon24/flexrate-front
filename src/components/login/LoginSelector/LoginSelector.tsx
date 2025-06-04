'use client';
import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { checkPinRegistered } from '@/apis/auth';
import BottomSheet from '@/components/BottomSheet/BottomSheet';

import {
  BtnContainer,
  BtnWrapper,
  Container,
  Question,
  SheetBtn,
  Title,
} from './LoginSelector.style';

type LoginSelectorProps = {
  onSelectPassword: () => void;
  onSelectFace: () => void;
};

const LoginSelector = ({ onSelectFace, onSelectPassword }: LoginSelectorProps) => {
  const router = useRouter();

  const handleSelectPin = async () => {

    alert('간편 비밀번호 기능은 현재 개발 중입니다.');
    
    // const accessToken = localStorage.getItem('accessToken');
    // if (!accessToken) {
    //   alert('로그인이 필요합니다.');
    //   router.push('/auth/login');
    //   return;
    // }

    // try {
    //   const data = await checkPinRegistered();
    //   if (data) {
    //     router.push('/pin/login');
    //   } else {
    //     router.push('/pin/register');
    //   }
    // } catch (error) {
    //   console.error('PIN 확인 실패:', error);
    //   alert('오류가 발생했습니다.');
    // }
  };

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
          <SheetBtn onClick={handleSelectPin}>
            <BtnContainer>
              <Image src={'/imgs/lock.svg'} width={36} height={36} alt="간편 비밀번호" />
              간편 비밀번호
            </BtnContainer>
          </SheetBtn>
          <SheetBtn onClick={onSelectFace}>
            <BtnContainer>
              <Image src={'/icons/finger_36.svg'} width={36} height={36} alt="지문" />
              지문 인증
            </BtnContainer>
          </SheetBtn>
          <SheetBtn onClick={onSelectPassword}>
            <BtnContainer>
              <Image src={'/icons/webee_36.svg'} width={36} height={36} alt="일반 로그인" />
              일반 로그인
            </BtnContainer>
          </SheetBtn>
        </BtnWrapper>
      </BottomSheet>
    </Container>
  );
};

export default LoginSelector;
