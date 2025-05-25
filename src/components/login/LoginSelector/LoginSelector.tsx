'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import BottomSheet from '@/components/BottomSheet/BottomSheet';

import {
  BtnContainer,
  BtnWrapper,
  Container,
  Question,
  SheetBtn,
  Title,
} from './LoginSelector.style';

// API 호출 함수 임포트 위치에 맞게 수정 필요
import { checkPinRegistered } from '@/apis/auth'; 

type LoginSelectorProps = {
  onSelectPassword: () => void;
  onSelectFace: () => void;
};

const LoginSelector = ({
  onSelectFace,
  onSelectPassword,
}: LoginSelectorProps) => {
  const router = useRouter();

const handleSelectPin = async () => {
  try {
    const userId = localStorage.getItem('memberId');
    if (!userId || isNaN(Number(userId))) {
      console.log('userId가 없거나 유효하지 않습니다.');
      router.push('/pin/register');
      return;
    }
    const isRegistered = await checkPinRegistered(Number(userId));
    console.log('PIN 등록 여부:', isRegistered);

    if (isRegistered) {
      router.push('/pin/login');  // 등록된 경우 로그인 페이지로 이동
    } else {
      router.push('/pin/register');  // 미등록 시 등록 페이지로 이동
    }
  } catch (error) {
    console.error('PIN 등록 여부 확인 중 오류:', error);
    router.push('/pin/register');  // 오류 발생 시 등록 페이지로 이동
  }
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
