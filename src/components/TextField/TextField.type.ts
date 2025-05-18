import React from 'react';

export type RightIconType = 'CHANGE' | 'DELETE' | 'TIMER';
export type InputType = 'INACTIVE' | 'ACTIVE' | 'ERROR';
export type RightContent =
  | { type: 'CHANGE'; onClick: () => void }
  | { type: 'DELETE'; onClick: () => void }
  | { type: 'TIMER'; text: string };

export interface TextFieldContextProps {
  value?: string | number;
  onChange: (v: string) => void;
  isError?: boolean;
  isDisabled?: boolean;
  rightContent?: RightContent;
}

export interface TextFieldProps extends TextFieldContextProps {
  children: React.ReactNode;
}
