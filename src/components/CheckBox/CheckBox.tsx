'use client';

import Image from 'next/image';
import styled from '@emotion/styled';
import { ImageLabelContainer, Label, ShowMore, Wrapper } from './CheckBox.style';

interface SvgCheckboxProps {
  size?: 'large' | 'small';
  checked: boolean;
  label: string;
  showMoreText?: string;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}

const CheckBox = ({
  size = 'small',
  checked,
  label,
  showMoreText,
  disabled = false,
  onChange,
}: SvgCheckboxProps) => {
  const imageSrc = `/icons/checkbox_${size}_${checked ? 'checked' : 'unchecked'}.svg`;

  return (
    <Wrapper disabled={disabled} size={size} onClick={() => !disabled && onChange(!checked)}>
      <ImageLabelContainer>
        <Image
          src={imageSrc}
          alt={`${label} checkbox`}
          width={size === 'large' ? 27 : 18}
          height={size === 'large' ? 27 : 18}
        />
        <Label disabled={disabled} size={size}>
          {label}
        </Label>
      </ImageLabelContainer>
      {showMoreText && <ShowMore>{showMoreText}</ShowMore>}
    </Wrapper>
  );
};

export default CheckBox;
