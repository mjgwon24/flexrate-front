'use client';

import React, { useState, useMemo, useEffect } from 'react';

import { loginWithPin } from '@/apis/auth';
 
import {
  Container,
  Title,
  DotWrapper,
  Dot,
  KeypadWrapper,
  KeyButton,
} from './PinLogin.style';

// API 함수 import (실제 경로에 맞게 조정 필요)

const PIN_LENGTH = 6;

const shuffleArray = (array: number[]) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const PinLogin = () => {
  const [pin, setPin] = useState<string[]>(Array(PIN_LENGTH).fill(''));
  const [loading, setLoading] = useState(false);

  // TODO: 실제 memberId는 로그인 상태나 Context에서 받아오기
  const memberId = 123; 

  const shuffledNumbers = useMemo(() => shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]), []);

  const handleKeyClick = (key: string) => {
    if (loading) return; // 로딩 중엔 입력 막기

    const newPin = [...pin];

    if (key === 'del') {
      const lastFilled = newPin.findLastIndex((d) => d !== '');
      if (lastFilled >= 0) newPin[lastFilled] = '';
    } else if (key === 'reset') {
      newPin.fill('');
    } else {
      const firstEmpty = newPin.findIndex((d) => d === '');
      if (firstEmpty >= 0) newPin[firstEmpty] = key;
    }

    setPin(newPin);
  };

  // PIN이 다 채워지면 자동으로 로그인 시도
  useEffect(() => {
    const pinStr = pin.join('');
    if (pinStr.length === PIN_LENGTH && !pin.includes('')) {
      const doLogin = async () => {
        setLoading(true);
        try {
          const response = await loginWithPin(memberId, pinStr) as unknown as { user: { name: string } };
          alert(`로그인 성공! 환영합니다, ${response.user.name}님.`);
          // TODO: 로그인 성공 처리 (토큰 저장, 페이지 이동 등)
        } catch (error) {
          alert('로그인 실패: PIN이 올바르지 않거나 오류가 발생했습니다.');
          setPin(Array(PIN_LENGTH).fill('')); // PIN 초기화
        } finally {
          setLoading(false);
        }
      };
      doLogin();
    }
  }, [pin, memberId]);

  return (
    <Container>
      <Title>간편 비밀번호 로그인</Title>
      <DotWrapper>
        {pin.map((digit, i) => (
          <Dot key={i} filled={digit !== ''} />
        ))}
      </DotWrapper>

      <KeypadWrapper>
        {shuffledNumbers.map((num) => (
          <KeyButton key={num} onClick={() => handleKeyClick(num.toString())} disabled={loading}>
            {num}
          </KeyButton>
        ))}
        <KeyButton onClick={() => handleKeyClick('reset')} disabled={loading}>전체삭제</KeyButton>
        <KeyButton onClick={() => handleKeyClick('0')} disabled={loading}>0</KeyButton>
        <KeyButton onClick={() => handleKeyClick('del')} disabled={loading}>←</KeyButton>
      </KeypadWrapper>
    </Container>
  );
};

export default PinLogin;
