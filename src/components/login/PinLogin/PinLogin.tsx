'use client';

import React, { useState, useMemo, useEffect } from 'react';

import { loginWithPin } from '@/apis/auth';
import PinEmailForm from '@/components/login/PinLogin/PinEmailForm/PinEmailForm';

import {
  Container,
  Title,
  DotWrapper,
  Dot,
  KeypadWrapper,
  KeyButton,
  RegisterButtonWrapper,
  RegisterButton,
} from './PinLogin.style';

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
  const [showPinEmailForm, setShowPinEmailForm] = useState(false);

  const email = '';

  const shuffledNumbers = useMemo(() => shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]), []);

  const handleKeyClick = (key: string) => {
    if (loading) return;

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

  useEffect(() => {
    const pinStr = pin.join('');
    if (pinStr.length === PIN_LENGTH && !pin.includes('')) {
      const doLogin = async () => {
        setLoading(true);
        try {
          const response = await loginWithPin(email, pinStr);
          alert(`로그인 성공! 환영합니다, ${response.user.name}님.`);
          // TODO: 토큰 저장 등 로그인 처리
        } catch (error) {
          alert('로그인 실패: PIN이 올바르지 않거나 오류가 발생했습니다.');
          setPin(Array(PIN_LENGTH).fill(''));
        } finally {
          setLoading(false);
        }
      };
      doLogin();
    }
  }, [pin, email]);

  const handleRegisterClick = () => {
    setShowPinEmailForm(true);
  };

  // PinEmailForm이 보여야 하면 해당 컴포넌트 렌더링
  if (showPinEmailForm) {
    return (
      <PinEmailForm
        onVerified={() => {
          alert(`이메일 인증 완료!`);
          setShowPinEmailForm(false);
        }}
        onCancel={() => setShowPinEmailForm(false)}
      />
    );
  }

  return (
    <Container>
      <Title>간편 비밀번호 로그인</Title>
      <DotWrapper>
        {pin.map((digit, i) => (
          <Dot key={i} filled={digit !== ''} />
        ))}
      </DotWrapper>

      <RegisterButtonWrapper>
        <RegisterButton onClick={handleRegisterClick} disabled={loading}>
          등록 / 변경 &gt;
        </RegisterButton>
      </RegisterButtonWrapper>

      <KeypadWrapper>
        {shuffledNumbers.map((num) => (
          <KeyButton key={num} onClick={() => handleKeyClick(num.toString())} disabled={loading}>
            {num}
          </KeyButton>
        ))}
        <KeyButton onClick={() => handleKeyClick('reset')} disabled={loading}>
          전체삭제
        </KeyButton>
        <KeyButton onClick={() => handleKeyClick('0')} disabled={loading}>
          0
        </KeyButton>
        <KeyButton onClick={() => handleKeyClick('del')} disabled={loading}>
          ←
        </KeyButton>
      </KeypadWrapper>
    </Container>
  );
};

export default PinLogin;
