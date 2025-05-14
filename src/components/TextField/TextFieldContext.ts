'use client';

import { createContext, useContext } from 'react';

import { TextFieldContextProps } from './TextField.type';

export const TextFieldContext = createContext<TextFieldContextProps | null>(null);

export const useTextFieldContext = () => {
  const ctx = useContext(TextFieldContext);
  if (!ctx) throw new Error('TextField.* must be used within <TextField>');
  return ctx;
};
