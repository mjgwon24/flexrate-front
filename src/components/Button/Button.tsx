'use client';
import { ButtonContainer } from './Button.style';
import { ButtonProps, getButtonStyle } from './Button.type';

const Button = ({ text, size, varient = 'PRIMARY', selected = false, ...props }: ButtonProps) => {
  const { backgroundColor, borderColor, textColor } = getButtonStyle(varient, selected);

  return (
    <ButtonContainer
      $size={size}
      $bg={backgroundColor}
      $border={borderColor}
      $color={textColor}
      {...props}
    >
      {text}
    </ButtonContainer>
  );
};

export default Button;
