'use client';
import React, { useState } from 'react';
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

const TextFieldBox = ({ placeholder }: { placeholder?: string }) => {
  const { value, onChange, isError, isDisabled } = useTextFieldContext();
  const [focused, setFocused] = useState(false);

  const inputType = getInputType({ isError, isDisabled, value }) ?? 'INACTIVE';
  const displayValue = value === '0' ? '' : value;

  return (
    <S.InputWrapper>
      <S.StyledInput
        id="text-field"
        value={displayValue}
        onChange={(e) => onChange(e.target.value)}
        $inputType={inputType}
        disabled={isDisabled}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <S.RightContent>{<RightIcon focused={focused} />}</S.RightContent>
    </S.InputWrapper>
  );
};

const Label = ({
  children,
  helperText,
}: {
  children: React.ReactNode;
  helperText?: React.ReactNode;
}) => {
  return (
    <S.LabelRow>
      <S.Label htmlFor="text-field">{children}</S.Label>
      {helperText && <S.HelperText>{helperText}</S.HelperText>}
    </S.LabelRow>
  );
};

const RightIcon = ({ focused }: { focused: boolean }) => {
  const { rightContent, value, onChange } = useTextFieldContext();

  if (!rightContent) return null;

  const hasValue = !!value;

  switch (rightContent.type) {
    case 'CHANGE':
      return (
        <S.ChangeBtn type="button" onClick={rightContent.onClick}>
          변경
        </S.ChangeBtn>
      );

    case 'DELETE':
      if (!focused || !hasValue) return null;
      return (
        <DeleteIcon
          onClick={() => {
            onChange('');
            rightContent.onClick();
          }}
        />
      );

    case 'TIMER':
      return <S.TimeText>01:23</S.TimeText>;

    default:
      return null;
  }
};

const ErrorText = ({ message }: { message: string }) => {
  const { isError } = useTextFieldContext();

  if (!isError) return null;

  return (
    <S.ErrorMessageWrapper>
      <S.ErrorMessage>
        <ErrorIcon />
        {message}
      </S.ErrorMessage>
    </S.ErrorMessageWrapper>
  );
};

TextField.TextFieldBox = TextFieldBox;
TextField.Label = Label;
TextField.ErrorText = ErrorText;

export default TextField;
