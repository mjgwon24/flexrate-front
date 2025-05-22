'use client';

import React, { useState, useMemo } from 'react';

import {
  Container,
  Title,
  DotWrapper,
  Dot,
  KeypadWrapper,
  KeyButton,
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

  // 숫자 1~9를 랜덤하게 섞은 배열, 컴포넌트가 처음 마운트될 때만 섞음
  const shuffledNumbers = useMemo(() => shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]), []);

  const handleKeyClick = (key: string) => {
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
          <KeyButton key={num} onClick={() => handleKeyClick(num.toString())}>
            {num}
          </KeyButton>
        ))}
        <KeyButton onClick={() => handleKeyClick('reset')}>전체삭제</KeyButton>
        <KeyButton onClick={() => handleKeyClick('0')}>0</KeyButton>
        <KeyButton onClick={() => handleKeyClick('del')}>←</KeyButton>
      </KeypadWrapper>
    </Container>
  );
};

export default PinLogin;
