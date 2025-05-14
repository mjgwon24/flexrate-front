'use client';

import styled from '@emotion/styled';

import { semanticColor } from '@/styles/colors';
import { InputType } from './TextField.type';
import { typoStyleMap } from '@/styles/typos';

const getBorderColor = (type: InputType = 'ACTIVE') => {
  switch (type) {
    case 'ERROR':
      return semanticColor.text.state.textError;
    case 'INACTIVE':
      return 'transparent';
    default:
      return semanticColor.button.active.sub3;
  }
};

const getTextColor = (type: InputType) => {
  switch (type) {
    case 'ERROR':
      return semanticColor.text.state.textError;
    case 'INACTIVE':
      return semanticColor.text.normal.sub3;
    default:
      return semanticColor.text.normal.primary;
  }
};

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5px;
`;

export const StyledInput = styled.input<{ $inputType: InputType }>`
  ${typoStyleMap['body1_m']};
  display: flex;
  width: 100%;
  height: 54px;
  padding: 18px 15px;
  align-items: center;
  border: 1px solid ${({ $inputType }) => getBorderColor($inputType)};
  border-radius: 12px;
  background-color: ${({ $inputType }) =>
    $inputType === 'INACTIVE' ? `${semanticColor.bg.subtle}` : `${semanticColor.bg.default}`};
  color: ${({ $inputType }) => getTextColor($inputType)};

  &::placeholder {
    color: ${semanticColor.text.normal.sub3};
  }

  &:focus {
    outline: none;
    border: 1px solid ${semanticColor.button.active.sub3};
    color: ${semanticColor.text.normal.primary};
    background-color: ${semanticColor.bg.default};
  }

  &:disabled {
    cursor: not-allowed;
    border: transparent;
    color: ${semanticColor.text.normal.sub3};
    background-color: ${semanticColor.bg.subtle};
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const RightContent = styled.div`
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
`;

export const Label = styled.label<{ $inputType: InputType }>`
  ${typoStyleMap['body2_m']}
  padding-left: 6px;
  color: ${semanticColor.text.normal.primary};
  transition: all 0.2s ease;
  background-color: ${semanticColor.bg.default};
  pointer-events: none;
`;

export const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4px;
  min-width: 0;
`;

export const HelperText = styled.div<{ $isError: boolean | undefined }>`
  ${typoStyleMap['caption1_m']}
  padding-right: 6px;
  color: ${({ $isError }) =>
    $isError ? semanticColor.text.state.textError : semanticColor.text.normal.sub3};
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const ChangeBtn = styled.button`
  cursor: pointer;
  ${typoStyleMap['body2_sb']}
  padding: 8px 12px;
  justify-content: center;
  align-items: center;
  border-radius: 14px;
  border: 1px solid ${semanticColor.border.active.sub3};
  background-color: transparent;
  color: ${semanticColor.text.normal.sub1};
  line-height: 16px;
`;

export const TimeText = styled.div`
  color: ${semanticColor.text.state.textError};
`;
