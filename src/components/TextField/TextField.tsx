'use client';
import React from 'react';
import { TextFieldContext } from './TextFieldContext';
import { TextFieldProps } from './TextField.type';
import * as S from './TextField.style';
import { useTextFieldContext } from './TextFieldContext';
import { getInputType } from '@/lib/getInputType';
import ErrorIcon from '@/assets/icons/error_18.svg';
import DeleteIcon from '@/assets/icons/delete_24.svg';

const TextField = ({
  children,
  value,
  onChange,
  isError = false,
  isDisabled = false,
  rightContent,
}: TextFieldProps) => {
  const contextValue = {
    value,
    onChange,
    isError,
    isDisabled,
    rightContent,
  };

  return (
    <TextFieldContext.Provider value={contextValue}>
      <S.InputContainer>{children}</S.InputContainer>
    </TextFieldContext.Provider>
  );
};

const TextFieldBox = () => {
  const { value, onChange, isError, isDisabled } = useTextFieldContext();

  const inputType = getInputType({ isError, isDisabled, value }) ?? 'INACTIVE';

  return (
    <S.InputWrapper>
      <S.StyledInput
        id="text-field"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        $inputType={inputType}
        disabled={isDisabled}
        placeholder="입력하세요"
      />
      <S.RightContent>{<RightIcon />}</S.RightContent>
    </S.InputWrapper>
  );
};

const Label = ({
  children,
  helperText,
  errorMessage,
}: {
  children: React.ReactNode;
  helperText?: React.ReactNode;
  errorMessage?: React.ReactNode;
}) => {
  const { value, isDisabled, isError } = useTextFieldContext();

  const inputType = getInputType({ isError, isDisabled, value }) ?? 'INACTIVE';

  const rightText = isError ? errorMessage : helperText;

  return (
    <S.LabelRow>
      <S.Label $inputType={inputType} htmlFor="text-field">
        {children}
      </S.Label>
      {helperText && (
        <S.HelperText $isError={isError}>
          {isError && <ErrorIcon />}
          {rightText}
        </S.HelperText>
      )}
    </S.LabelRow>
  );
};

const RightIcon = () => {
  const { rightContent } = useTextFieldContext();

  if (!rightContent) return null;

  switch (rightContent.type) {
    case 'CHANGE':
      return <S.ChangeBtn type="button">변경</S.ChangeBtn>;

    case 'DELETE':
      return <DeleteIcon />;

    case 'TIMER':
      return <S.TimeText>01:23</S.TimeText>;

    default:
      return null;
  }
};

TextField.TextFieldBox = TextFieldBox;
TextField.Label = Label;

export default TextField;
