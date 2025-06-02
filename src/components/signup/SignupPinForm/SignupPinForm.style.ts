import styled from '@emotion/styled';

import { semanticColor } from '@/styles/colors';
import { typoStyleMap } from '@/styles/typos';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h2`
  margin: 120px 0 40px;
  ${typoStyleMap['head1']};
  color: ${semanticColor.text.normal.primary};

  @media (max-height: 670px) {
    margin: 70px 0 40px;
  }
`;

export const DotWrapper = styled.div`
  display: flex;
  gap: 25px;
  margin-bottom: 30px;
`;

export const Dot = styled.div<{ filled: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ filled }) =>
    filled ? semanticColor.bg.primary : semanticColor.bg.subtle};
`;

export const KeypadWrapper = styled.div`
  position: fixed;
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  padding: 35px 0px;
  background-color: ${semanticColor.bg.primary};
  margin-top: 150px;

  width: 768px;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const KeyButton = styled.button<{ $isText?: boolean }>`
  height: 60px;
  ${({ $isText }) => ($isText ? typoStyleMap['title3'] : typoStyleMap['head1'])};
  color: ${semanticColor.text.normal.onPrimary};
  background: transparent;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:active {
    background: rgba(255, 255, 255, 0.2);
  }
`;

export const RegisterButtonWrapper = styled.div`
  background-color: transparent;
  display: flex;
  justify-content: center;
`;

export const RegisterButton = styled.button`
  background-color: transparent;
  color: ${semanticColor.text.normal.primary};
  font-size: 14px;
  border: none;
  cursor: pointer;
`;
