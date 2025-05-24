'use client';

import React, { useState, useMemo, useEffect } from 'react';

import { registerPin } from '@/apis/auth';

import {
  Container,
  Title,
  DotWrapper,
  Dot,
  KeypadWrapper,
  KeyButton,
} from './AddPinLogin.style';

const PIN_LENGTH = 6;

const shuffleArray = (array: number[]) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

type AddPinLoginProps = {
  email: string;
  onComplete: () => void;
};

const AddPinLogin = ({ email, onComplete }: AddPinLoginProps) => {
  const [pin, setPin] = useState<string[]>(Array(PIN_LENGTH).fill(''));
  const [confirmPin, setConfirmPin] = useState<string[]>(Array(PIN_LENGTH).fill(''));
  const [step, setStep] = useState<'input' | 'confirm'>('input');
  const [loading, setLoading] = useState(false);

  const shuffledNumbers = useMemo(() => shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]), []);

  const handleKeyClick = (key: string) => {
    if (loading) return;

    if (step === 'input') {
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
    } else {
      // confirm 단계
      const newPin = [...confirmPin];
      if (key === 'del') {
        const lastFilled = newPin.findLastIndex((d) => d !== '');
        if (lastFilled >= 0) newPin[lastFilled] = '';
      } else if (key === 'reset') {
        newPin.fill('');
      } else {
        const firstEmpty = newPin.findIndex((d) => d === '');
        if (firstEmpty >= 0) newPin[firstEmpty] = key;
      }
      setConfirmPin(newPin);
    }
  };

  useEffect(() => {
    const pinStr = pin.join('');
    if (step === 'input' && pinStr.length === PIN_LENGTH && !pin.includes('')) {
      setStep('confirm');
      setConfirmPin(Array(PIN_LENGTH).fill(''));
    }
  }, [pin, step]);

  useEffect(() => {
    const confirmPinStr = confirmPin.join('');
    if (step === 'confirm' && confirmPinStr.length === PIN_LENGTH && !confirmPin.includes('')) {
      const pinStr = pin.join('');
      if (pinStr !== confirmPinStr) {
        alert('PIN이 일치하지 않습니다. 다시 입력해 주세요.');
        setPin(Array(PIN_LENGTH).fill(''));
        setConfirmPin(Array(PIN_LENGTH).fill(''));
        setStep('input');
        return;
      }

      // PIN 일치, 등록 시도
      const doRegister = async () => {
        setLoading(true);
        try {
          await registerPin({ email, pin: pinStr });
          alert('PIN 등록 완료!');
          onComplete();  // 등록 완료 후 부모 콜백 호출
        } catch (error) {
          console.error(error);
          alert('PIN 등록 실패. 다시 시도해 주세요.');
          setPin(Array(PIN_LENGTH).fill(''));
          setConfirmPin(Array(PIN_LENGTH).fill(''));
          setStep('input');
        } finally {
          setLoading(false);
        }
      };
      doRegister();
    }
  }, [confirmPin, email, pin, onComplete, step]);

  return (
    <Container>
      <Title>{step === 'input' ? '등록하실 PIN 6자리 입력하세요' : 'PIN 다시 입력해주세요'}</Title>
      <DotWrapper>
        {(step === 'input' ? pin : confirmPin).map((digit, i) => (
          <Dot key={i} filled={digit !== ''} />
        ))}
      </DotWrapper>

      <KeypadWrapper>
        {shuffledNumbers.map((num) => (
          <KeyButton
            key={num}
            onClick={() => handleKeyClick(num.toString())}
            disabled={loading}
          >
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

export default AddPinLogin;
