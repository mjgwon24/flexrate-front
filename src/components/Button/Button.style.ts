import styled from '@emotion/styled';

import { semanticColor } from '@/styles/colors';
import { typoStyleMap } from '@/styles/typos';

import {
  backgroundColorMap,
  borderColorMap,
  ButtonSize,
  ButtonVarient,
  sizeWidthMapping,
  textColorMap,
} from './Button.type';

interface StyledButtonProps {
  $size?: ButtonSize;
  $varient?: ButtonVarient;
}

export const ButtonContainer = styled.button<StyledButtonProps>`
  cursor: pointer;
  ${typoStyleMap['body1_sb']}
  width: ${({ $size }) => ($size ? sizeWidthMapping[$size] : sizeWidthMapping['XL'])};
  height: 54px;
  padding: 14px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: 1px solid ${({ $varient }) => borderColorMap[$varient ?? 'PRIMARY']};
  background-color: ${({ $varient }) => backgroundColorMap[$varient ?? 'PRIMARY']};
  color: ${({ $varient }) => textColorMap[$varient ?? 'PRIMARY']};

  &:disabled {
    cursor: not-allowed;
    background-color: ${semanticColor.button.inactive.default};
    color: ${semanticColor.text.normal.sub3};
    border: none;
  }
`;
