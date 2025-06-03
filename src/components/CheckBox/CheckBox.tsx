'use client';

import Image from 'next/image';

import { ImageLabelContainer, Label, ShowMore, Wrapper } from './CheckBox.style';

interface SvgCheckboxProps {
  size?: 'large' | 'small';
  checked: boolean;
  label: string;
  showMoreText?: string;
  showMoreUrl?: string;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}

const CheckBox = ({
  size = 'small',
  checked,
  label,
  showMoreText,
  showMoreUrl,
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
      {showMoreText && showMoreUrl ? (
        <ShowMore>
          <a
            href={showMoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
          >
            {showMoreText}
          </a>
        </ShowMore>
      ) : (
        showMoreText && <ShowMore>{showMoreText}</ShowMore>
      )}
    </Wrapper>
  );
};

export default CheckBox;
