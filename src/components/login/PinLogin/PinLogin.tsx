'use client';

import React, { useState, useMemo, useEffect } from 'react';

import { loginWithPin } from '@/apis/auth';
import AddPinLogin from '@/components/login/PinLogin/AddPinLogin/AddPinLogin'; // AddPinLogin 임포트
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

  const [verifiedEmail, setVerifiedEmail] = useState('');
  const [showAddPin, setShowAddPin] = useState(false);

  const email = verifiedEmail;

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
          alert(`로그인 성공! ${response.user.name}님.`);
          // TODO: 토큰 저장 등 로그인 처리
        } catch {
          alert('PIN이 올바르지 않거나 등록되지 않은 PIN입니다. ');
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

  // PIN 등록 화면 보여주기
  if (showAddPin) {
    return <AddPinLogin
        email={verifiedEmail}
        onComplete={() => {
          setShowAddPin(false);
          setPin(Array(PIN_LENGTH).fill(''));
        }}
      />;
  }

  // 이메일 인증 폼 보여주기
  if (showPinEmailForm) {
    return (
      <PinEmailForm
        onVerified={(emailFromForm: string) => {
          alert(`이메일 인증 완료!`);
          setVerifiedEmail(emailFromForm);
          setShowPinEmailForm(false);
          setShowAddPin(true);
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
