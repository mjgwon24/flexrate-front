'use client';

import { ButtonContainer } from './Button.style';
import { ButtonProps } from './Button.type';

const Button = ({ text, size, varient, ...props }: ButtonProps) => {
  return (
    <ButtonContainer $size={size} $varient={varient} {...props}>
      {text}
    </ButtonContainer>
  );
};

export default Button;
