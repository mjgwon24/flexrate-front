'use client';

import { semanticColor } from '@/styles/colors';

export type ButtonSize = 'XL' | 'L' | 'M' | 'S' | 'XS';
export type ButtonVarient = 'PRIMARY' | 'SECONDARY' | 'TERTIARY' | 'S_SPECIAL';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  size?: ButtonSize;
  varient?: ButtonVarient;
  selected?: boolean;
}

export const sizeWidthMapping: Record<ButtonSize, string> = {
  XL: '100%',
  L: '218px',
  M: 'calc(100%/2)',
  S: 'calc(100%/3)',
  XS: 'calc(100%/4)',
};

export const borderColorMap: Partial<Record<ButtonVarient, string>> = {
  PRIMARY: 'transparent',
  SECONDARY: semanticColor.border.active.primary,
  TERTIARY: semanticColor.border.active.sub3,
  S_SPECIAL: 'transparent',
};

export const backgroundColorMap: Record<ButtonVarient, string> = {
  PRIMARY: semanticColor.bgBtn.active.primary,
  SECONDARY: semanticColor.bgBtn.active.secondary,
  TERTIARY: semanticColor.bg.default,
  S_SPECIAL: semanticColor.bgBtn.inactive.default,
};

export const textColorMap: Record<ButtonVarient, string> = {
  PRIMARY: semanticColor.text.normal.onPrimary,
  SECONDARY: semanticColor.text.normal.accent,
  TERTIARY: semanticColor.text.normal.sub3,
  S_SPECIAL: semanticColor.text.normal.sub1,
};

export const getButtonStyle = (variant: ButtonVarient, isSelected: boolean = false) => {
  const finalVariant = isSelected ? 'SECONDARY' : variant ?? 'PRIMARY';

  return {
    backgroundColor: backgroundColorMap[finalVariant],
    borderColor: borderColorMap[finalVariant] ?? 'transparent',
    textColor: textColorMap[finalVariant],
  };
};
